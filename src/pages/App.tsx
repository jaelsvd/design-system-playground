import {
  Check,
  KeyRound,
  Moon,
  Palette,
  Plus,
  Sparkles,
  Sun,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Card, CardContent, CardFooter, CardHeader } from "../components/Card";
import { CommandMenu } from "../components/CommandMenu";
import { Dialog } from "../components/Dialog";
import { EmptyState } from "../components/EmptyState";
import { Switch } from "../components/Switch";
import { Tabs } from "../components/Tabs";
import { TextInput } from "../components/TextInput";
import { ToastRegion, type ToastMessage } from "../components/Toast";
import { Tooltip } from "../components/Tooltip";
import styles from "./App.module.scss";

export function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [digest, setDigest] = useState(true);
  const [mentions, setMentions] = useState(true);
  const [dialog, setDialog] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  const notify = useCallback(
    (title: string, kind: ToastMessage["kind"] = "success") =>
      setToasts((items) => [
        ...items,
        {
          id: Date.now(),
          kind,
          title,
          description:
            kind === "success" ? "Your preferences are up to date." : undefined,
        },
      ]),
    [],
  );
  const tabs = [
    {
      id: "profile",
      label: "Profile",
      content: (
        <div className={styles.form}>
          <TextInput
            label="Display name"
            defaultValue="Jordan Lee"
            helperText="This appears across your workspace."
            maxLength={40}
            characterCount
          />
          <TextInput
            label="Email address"
            type="email"
            defaultValue="jordan@example.com"
            success="Verified email address"
          />
        </div>
      ),
    },
    {
      id: "appearance",
      label: "Appearance",
      content: (
        <div className={styles.form}>
          <div>
            <h2 className={styles.sectionTitle}>Interface theme</h2>
            <p className={styles.sectionDescription}>
              Choose a comfortable working environment.
            </p>
          </div>
          <label className={styles.choice}>
            <input
              type="radio"
              checked={theme === "light"}
              onChange={() => setTheme("light")}
            />
            <Sun size={18} />
            <span>
              <strong>Light</strong>
              <span>Bright, warm surfaces for daylight.</span>
            </span>
          </label>
          <label className={styles.choice}>
            <input
              type="radio"
              checked={theme === "dark"}
              onChange={() => setTheme("dark")}
            />
            <Moon size={18} />
            <span>
              <strong>Dark</strong>
              <span>Quiet contrast for focused work.</span>
            </span>
          </label>
        </div>
      ),
    },
    {
      id: "notifications",
      label: "Notifications",
      content: (
        <div>
          <Switch
            checked={digest}
            onCheckedChange={setDigest}
            label="Weekly workspace digest"
            description="A concise summary of activity every Monday."
          />
          <div style={{ height: 20 }} />
          <Switch
            checked={mentions}
            onCheckedChange={setMentions}
            label="Mentions and replies"
            description="Stay in the loop when someone needs you."
          />
        </div>
      ),
    },
  ];
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.mark}>
            <Sparkles size={15} />
          </span>{" "}
          Interface
        </div>
        <div className={styles.actions}>
          <CommandMenu
            items={[
              {
                id: "appearance",
                label: "Change appearance",
                hint: "Choose light or dark mode",
                action: () => notify("Appearance settings opened", "info"),
              },
              {
                id: "invite",
                label: "Invite collaborator",
                hint: "Add someone to your workspace",
                action: () => notify("Invitation flow started"),
              },
              {
                id: "delete",
                label: "Delete workspace",
                hint: "Open destructive action",
                action: () => setDialog(true),
              },
            ]}
          />
          <Tooltip
            label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            <Button
              variant="ghost"
              iconOnly
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </Button>
          </Tooltip>
        </div>
      </header>
      <main className={styles.layout}>
        <nav className={styles.nav} aria-label="Preferences navigation">
          <p className={styles.navLabel}>Workspace</p>
          {["General", "Members", "Billing", "Preferences"].map((item) => (
            <button
              key={item}
              className={[
                styles.navItem,
                item === "Preferences" && styles.navItemActive,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {item}
            </button>
          ))}
        </nav>
        <section className={styles.content}>
          <p className={styles.eyebrow}>Workspace settings</p>
          <h1>Preferences</h1>
          <p className={styles.intro}>
            Personalize your workspace experience, notification rhythm, and
            account details.
          </p>
          <Card>
            <CardHeader>
              <div>
                <h2 className={styles.sectionTitle}>Your workspace</h2>
                <p className={styles.sectionDescription}>
                  A few details that make this space yours.
                </p>
              </div>
              <div className={styles.profile}>
                <span className={styles.avatar}>JL</span>
                <div>
                  <strong>Jordan Lee</strong>
                  <span>Design engineering</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs items={tabs} defaultValue="profile" />
            </CardContent>
            <CardFooter>
              <Button
                variant="secondary"
                onClick={() => notify("Changes discarded", "info")}
              >
                Discard
              </Button>
              <Button onClick={() => notify("Preferences saved")}>
                <Check size={16} />
                Save changes
              </Button>
            </CardFooter>
          </Card>
          <div style={{ height: 24 }} />
          <Card>
            <CardHeader>
              <div>
                <h2 className={styles.sectionTitle}>Privacy & access</h2>
                <p className={styles.sectionDescription}>
                  Review integrations and recovery settings.
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className={styles.row}>
                <div>
                  <strong>Passkeys</strong>
                  <span>Add a secure, passwordless sign-in method.</span>
                </div>
                <Button size="small" variant="secondary">
                  <KeyRound size={15} />
                  Add passkey
                </Button>
              </div>
              <div className={styles.row}>
                <div>
                  <strong>Connected integrations</strong>
                  <span>No services connected to this workspace yet.</span>
                </div>
              </div>
              <EmptyState
                icon={<Palette size={20} />}
                title="Keep your workspace focused"
                description="Connect only the tools you use often, and manage their access here."
                actions={
                  <Button size="small" variant="secondary">
                    <Plus size={15} />
                    Browse integrations
                  </Button>
                }
              />
            </CardContent>
          </Card>
          <div style={{ height: 24 }} />
          <Card className={styles.danger}>
            <CardHeader>
              <div>
                <h2 className={styles.sectionTitle}>Danger zone</h2>
                <p className={styles.sectionDescription}>
                  Actions here are permanent and affect every member.
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className={styles.row}>
                <div>
                  <strong>Delete this workspace</strong>
                  <span>Remove all projects, files, and member access.</span>
                </div>
                <Button
                  variant="destructive"
                  size="small"
                  onClick={() => setDialog(true)}
                >
                  <Trash2 size={15} />
                  Delete workspace
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Dialog
        open={dialog}
        onOpenChange={setDialog}
        title="Delete this workspace?"
        description="This action cannot be undone. All workspace content will be permanently removed."
        footer={
          <>
            <Button variant="secondary" onClick={() => setDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setDialog(false);
                notify("Workspace deletion was cancelled", "warning");
              }}
            >
              I understand, delete
            </Button>
          </>
        }
      >
        <p style={{ color: "var(--color-text-muted)", margin: 0 }}>
          For safety, this demo never deletes data.
        </p>
      </Dialog>
      <ToastRegion
        messages={toasts}
        onDismiss={(id) =>
          setToasts((items) => items.filter((item) => item.id !== id))
        }
      />
    </div>
  );
}
