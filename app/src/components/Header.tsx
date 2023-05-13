import styles from "./Header.module.css";
import { useOthers, useUpdateMyPresence } from "../liveblocks.config";
import Avatar from "./Avatar";
import Button from "./Button";
import SunIcon from "../icons/sun.svg";
import MoonIcon from "../icons/moon.svg";
import Tooltip from "./Tooltip";
import { Theme } from "../types";
import { useEffect, useState } from "react";
import { applyTheme } from "../utils";
import { LOCAL_STORAGE_THEME, USER_COLORS } from "../constants";
import { AssemblyAiRecorder } from "../services/assemblyAi";

type HeaderProps = {
  recorder: AssemblyAiRecorder | null;
};

const getPromiseState = (p: Promise<unknown>) => {
  const t = {};
  return Promise.race([p, t]).then<"pending" | "fulfilled", "rejected">(
    (v) => (v === t ? "pending" : "fulfilled"),
    () => "rejected"
  );
};

export default function Header({ recorder }: HeaderProps) {
  const updateMyPresence = useUpdateMyPresence();
  const others = useOthers();

  const someoneRecording = others.some((o) => o.presence.isRecording);

  const [theme, setTheme] = useState<Theme | null>(
    localStorage.getItem(LOCAL_STORAGE_THEME) as Theme | null
  );

  useEffect(() => {
    if (!theme) {
      return;
    }

    localStorage.setItem(LOCAL_STORAGE_THEME, theme);
    applyTheme(theme);
  }, [theme]);

  const [{ loading }, rerender] = useState({ loading: false });
  const handleRecordPress = async () => {
    updateMyPresence({
      isRecording: true,
    });

    const task = recorder?.startRecording();
    if (task && (await getPromiseState(task)) === "pending") {
      rerender({ loading: true });
      await task;
    }
    rerender({ loading: false });
  };
  const handleStopPress = () => {
    updateMyPresence({
      isRecording: false,
    });

    recorder?.pauseRecording();
    rerender({ loading: false });
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Tooltip content="Switch Theme">
            <Button
              appearance="ghost"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              ariaLabel="Switch Theme"
              isSquare
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </Button>
          </Tooltip>
        </div>
        <div>
          {someoneRecording && <p>Another user is recording...</p>}
          {!someoneRecording && !loading && !!recorder?.getIsPaused() && (
            <button className={styles.recordButton} onClick={handleRecordPress}>
              Record
            </button>
          )}
          {!someoneRecording && loading && (
            <button className={styles.loadingButton} disabled>
              Loading...
            </button>
          )}
          {!someoneRecording && !loading && !recorder?.getIsPaused() && (
            <button className={styles.stopButton} onClick={handleStopPress}>
              Stop Recording
            </button>
          )}
        </div>
        <div className={styles.right}>
          <div className={styles.avatars}>
            {others.map((user) => {
              const {
                info: { imageUrl, name },
                connectionId,
              } = user;
              return (
                <Avatar
                  key={connectionId}
                  imageUrl={imageUrl}
                  name={name}
                  color={USER_COLORS[connectionId % USER_COLORS.length]}
                />
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
