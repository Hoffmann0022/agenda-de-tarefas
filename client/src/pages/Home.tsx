/**
 * Estilo: Minimalismo funcional com contraste calmo — uma coluna editorial estável,
 * violeta Agenda como ação e superfícies equivalentes entre claro e escuro.
 */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  Keyboard,
  ListTodo,
  Moon,
  Pencil,
  Plus,
  Search,
  Sun,
  Trash2,
} from "lucide-react";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type Filter = "all" | "pending" | "done";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
};

const STORAGE_KEY = "agenda-de-tarefas.tasks.v1";

const ASSETS = {
  brand: "/manus-storage/agenda-logo-mark_6fdd9035.png",
  empty: "/manus-storage/agenda-empty-tasks_5cea687b.png",
  search: "/manus-storage/agenda-search-empty_f59cb05c.png",
  completed: "/manus-storage/agenda-completed-empty_7eb470f0.png",
};

function loadStoredTasks(): Task[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const stored = JSON.parse(raw);
    return Array.isArray(stored)
      ? stored.filter(
          (task): task is Task =>
            typeof task?.id === "string" &&
            typeof task?.title === "string" &&
            typeof task?.completed === "boolean"
        )
      : [];
  } catch {
    return [];
  }
}

function createTaskId() {
  return window.crypto?.randomUUID?.() ?? `task-${Date.now()}`;
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [tasks, setTasks] = useState<Task[]>(loadStoredTasks);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const targetIsEditable =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (
        event.key.toLowerCase() === "n" &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !targetIsEditable &&
        !dialogOpen
      ) {
        event.preventDefault();
        openTaskDialog();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [dialogOpen]);

  const filteredTasks = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
    return tasks.filter((task) => {
      const matchesQuery = task.title.toLocaleLowerCase("pt-BR").includes(normalizedQuery);
      const matchesFilter =
        filter === "all" ||
        (filter === "done" && task.completed) ||
        (filter === "pending" && !task.completed);
      return matchesQuery && matchesFilter;
    });
  }, [filter, query, tasks]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  function openTaskDialog(task?: Task) {
    setEditingTask(task ?? null);
    setDraft(task?.title ?? "");
    setDialogOpen(true);
  }

  function handleDialogChange(open: boolean) {
    setDialogOpen(open);
    if (!open) {
      setDraft("");
      setEditingTask(null);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = draft.trim();

    if (!title) {
      toast.error("Escreva o nome da tarefa.", {
        description: "O campo não pode ficar vazio.",
      });
      return;
    }

    if (editingTask) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTask.id ? { ...task, title } : task
        )
      );
      toast.success("Tarefa atualizada.", { description: "A alteração foi salva." });
    } else {
      setTasks((currentTasks) => [
        { id: createTaskId(), title, completed: false, createdAt: Date.now() },
        ...currentTasks,
      ]);
      toast.success("Tarefa adicionada.", { description: "Sua agenda foi atualizada." });
    }

    handleDialogChange(false);
  }

  function toggleTask(taskId: string, completed: boolean) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, completed } : task
      )
    );
    toast.success(completed ? "Tarefa concluída." : "Tarefa reaberta.", {
      description: completed
        ? "Bom trabalho — a conclusão foi registrada."
        : "Ela voltou para sua lista de pendências.",
    });
  }

  function confirmDelete() {
    if (!taskToDelete) return;
    const deletedTask = taskToDelete;
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== deletedTask.id)
    );
    setTaskToDelete(null);
    toast("Tarefa excluída.", {
      description: "A tarefa foi removida da sua agenda.",
      action: {
        label: "Desfazer",
        onClick: () => {
          setTasks((currentTasks) => [deletedTask, ...currentTasks]);
          toast.success("Exclusão desfeita.");
        },
      },
    });
  }

  const emptyState = getEmptyState({
    hasAnyTask: tasks.length > 0,
    hasSearch: Boolean(query.trim()),
    filter,
  });

  return (
    <main className="agenda-shell">
      <div className="agenda-noise" aria-hidden="true" />

      <section className="agenda-workspace" aria-labelledby="page-title">
        <header className="workspace-header">
          <div className="brand-lockup">
            <img
              src={ASSETS.brand}
              alt=""
              className="brand-mark"
              width={48}
              height={48}
            />
            <div>
              <p className="eyebrow">organização pessoal</p>
              <h1 id="page-title">Agenda de tarefas</h1>
            </div>
          </div>

          <div className="header-actions">
            <div className="task-summary" aria-live="polite">
              <CheckCircle2 aria-hidden="true" />
              <span>
                <strong>{completedCount}</strong> de {tasks.length} concluídas
              </span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="theme-button"
                  onClick={toggleTheme}
                  aria-label={
                    theme === "light"
                      ? "Ativar modo escuro"
                      : "Ativar modo claro"
                  }
                >
                  {theme === "light" ? <Moon /> : <Sun />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {theme === "light" ? "Usar modo escuro" : "Usar modo claro"}
              </TooltipContent>
            </Tooltip>
          </div>
        </header>

        <div className="progress-area" aria-label={`${progress}% das tarefas concluídas`}>
          <div className="progress-track">
            <div className="progress-value" style={{ width: `${progress}%` }} />
          </div>
          <span>{progress}%</span>
        </div>

        <div className="control-band">
          <div className="search-field">
            <label htmlFor="task-search" className="sr-only">
              Procurar tarefas
            </label>
            <Search aria-hidden="true" />
            <Input
              id="task-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Procurar tarefa..."
              className="task-search-input"
            />
          </div>

          <div className="filter-wrap">
            <label htmlFor="task-filter" className="sr-only">
              Filtrar tarefas
            </label>
            <Select value={filter} onValueChange={(value) => setFilter(value as Filter)}>
              <SelectTrigger id="task-filter" className="filter-select" aria-label="Filtrar tarefas">
                <ListTodo aria-hidden="true" />
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent className="filter-content">
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="done">Concluídas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <section className="task-region" aria-labelledby="task-list-title">
          <div className="list-heading">
            <h2 id="task-list-title">Suas tarefas</h2>
            <span>
              {filteredTasks.length === 1
                ? "1 item visível"
                : `${filteredTasks.length} itens visíveis`}
            </span>
          </div>

          {filteredTasks.length ? (
            <ul className="task-list" aria-label="Lista de tarefas">
              {filteredTasks.map((task) => (
                <li
                  key={task.id}
                  className={cn("task-row", task.completed && "task-row-complete")}
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={(checked) => toggleTask(task.id, checked === true)}
                    aria-label={
                      task.completed
                        ? `Marcar ${task.title} como pendente`
                        : `Marcar ${task.title} como concluída`
                    }
                    className="task-checkbox"
                  />
                  <button
                    type="button"
                    className="task-title-button"
                    onClick={() => toggleTask(task.id, !task.completed)}
                    aria-label={
                      task.completed
                        ? `Marcar ${task.title} como pendente`
                        : `Marcar ${task.title} como concluída`
                    }
                  >
                    <span className="task-title">{task.title}</span>
                    {task.completed && <span className="task-state">Concluída</span>}
                  </button>
                  <div className="task-actions">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="icon-action"
                          onClick={() => openTaskDialog(task)}
                          aria-label={`Editar ${task.title}`}
                        >
                          <Pencil />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Editar tarefa</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="icon-action destructive-action"
                          onClick={() => setTaskToDelete(task)}
                          aria-label={`Excluir ${task.title}`}
                        >
                          <Trash2 />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Excluir tarefa</TooltipContent>
                    </Tooltip>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <Empty className="agenda-empty-state">
              <EmptyMedia>
                <img src={emptyState.image} alt="" className="empty-illustration" />
              </EmptyMedia>
              <EmptyHeader>
                <EmptyTitle>{emptyState.title}</EmptyTitle>
                <EmptyDescription>{emptyState.description}</EmptyDescription>
              </EmptyHeader>
              {!tasks.length && (
                <Button className="empty-action" onClick={() => openTaskDialog()}>
                  <Plus aria-hidden="true" />
                  Criar primeira tarefa
                </Button>
              )}
            </Empty>
          )}
        </section>

        <footer className="workspace-footer">
          <Keyboard aria-hidden="true" />
          <span>Atalho: pressione <kbd>N</kbd> para criar uma tarefa.</span>
        </footer>
      </section>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            className="floating-add"
            onClick={() => openTaskDialog()}
            aria-label="Adicionar nova tarefa"
          >
            <Plus />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">Nova tarefa</TooltipContent>
      </Tooltip>

      <Dialog open={dialogOpen} onOpenChange={handleDialogChange}>
        <DialogContent className="task-dialog" showCloseButton>
          <DialogHeader className="task-dialog-header">
            <p className="dialog-kicker">{editingTask ? "ajustar item" : "organizar agora"}</p>
            <DialogTitle>{editingTask ? "Editar tarefa" : "Nova tarefa"}</DialogTitle>
            <DialogDescription>
              {editingTask
                ? "Atualize o que precisa ser feito."
                : "Registre a próxima tarefa importante."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="task-form">
            <div className="form-field">
              <label htmlFor="task-title">Nome da tarefa</label>
              <Input
                id="task-title"
                autoFocus
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ex.: Enviar o relatório semanal"
                maxLength={120}
                className="dialog-input"
              />
            </div>
            <DialogFooter className="task-dialog-footer">
              <Button
                type="button"
                variant="outline"
                className="cancel-button"
                onClick={() => handleDialogChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" className="submit-button">
                {editingTask ? "Salvar alteração" : "Adicionar tarefa"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={Boolean(taskToDelete)}
        onOpenChange={(open) => !open && setTaskToDelete(null)}
      >
        <AlertDialogContent className="delete-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir tarefa?</AlertDialogTitle>
            <AlertDialogDescription>
              {taskToDelete
                ? `“${taskToDelete.title}” será removida da sua agenda.`
                : "Esta tarefa será removida da sua agenda."}
              <span className="delete-dialog-note"> Você ainda poderá desfazer a ação logo em seguida.</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="task-dialog-footer">
            <AlertDialogCancel className="cancel-button">Cancelar</AlertDialogCancel>
            <AlertDialogAction className="delete-confirm" onClick={confirmDelete}>
              Excluir tarefa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}

function getEmptyState({
  hasAnyTask,
  hasSearch,
  filter,
}: {
  hasAnyTask: boolean;
  hasSearch: boolean;
  filter: Filter;
}) {
  if (!hasAnyTask) {
    return {
      image: ASSETS.empty,
      title: "Nenhuma tarefa encontrada",
      description: "Sua agenda está pronta para receber o que importa.",
    };
  }

  if (hasSearch) {
    return {
      image: ASSETS.search,
      title: "Nenhuma tarefa corresponde à busca",
      description: "Tente outro termo ou ajuste o filtro selecionado.",
    };
  }

  if (filter === "done") {
    return {
      image: ASSETS.completed,
      title: "Nenhuma tarefa concluída ainda",
      description: "Quando finalizar uma tarefa, ela aparecerá aqui.",
    };
  }

  return {
    image: ASSETS.empty,
    title: "Nenhuma tarefa pendente",
    description: "Tudo em dia por aqui. Aproveite esse respiro.",
  };
}
