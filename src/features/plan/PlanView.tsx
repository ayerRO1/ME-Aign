import { useMemo, useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Icon } from '../../components/ui/Icon';
import { useAppStore, PlanDay, Meal, Ingredient, Unit } from '../../store/useAppStore';
import { useToastStore } from '../../store/useToastStore';

const units: Unit[] = ['g', 'buc', 'ml'];

function cloneMeal(meal: Meal): Meal {
  return {
    ...meal,
    id: crypto.randomUUID(),
    ingrediente: meal.ingrediente.map((item) => ({ ...item, id: crypto.randomUUID() })),
    reteta: { ...meal.reteta, pasi: [...meal.reteta.pasi] }
  };
}

function createEmptyMeal(title: string, time: string): Meal {
  return {
    id: crypto.randomUUID(),
    titlu: title,
    oraImplicita: time,
    caloriiEstimate: 0,
    ingrediente: [],
    reteta: { pasi: [], prepMinute: 0, cookMinute: 0 }
  };
}

export function PlanView() {
  const { plan, updatePlan, resetPlan } = useAppStore();
  const pushToast = useToastStore((state) => state.push);
  const [editingDay, setEditingDay] = useState<PlanDay | null>(null);
  const [showReset, setShowReset] = useState(false);
  const [copySource, setCopySource] = useState<PlanDay | null>(null);
  const [copyTargetIndex, setCopyTargetIndex] = useState<number>(1);

  const sortedDays = useMemo(() => [...plan.days].sort((a, b) => a.index - b.index), [plan.days]);

  const handleSave = () => {
    if (!editingDay) return;
    const updated = plan.days.map((day) => (day.index === editingDay.index ? editingDay : day));
    updatePlan({ ...plan, days: updated });
    setEditingDay(null);
    pushToast('Salvat');
  };

  const handleAddDay = () => {
    const nextIndex = plan.days.length + 1;
    const template = plan.days[plan.days.length - 1];
    const newDay: PlanDay = {
      index: nextIndex,
      masa1: template ? cloneMeal(template.masa1) : createEmptyMeal('Masa 1', '12:00'),
      masa2: template ? cloneMeal(template.masa2) : createEmptyMeal('Masa 2', '19:00')
    };
    updatePlan({ ...plan, days: [...plan.days, newDay] });
    pushToast('Zi adăugată');
  };

  const handleReset = () => {
    resetPlan();
    setShowReset(false);
    pushToast('Resetat');
  };

  const handleCopyDay = () => {
    if (!copySource) return;
    if (copyTargetIndex === copySource.index) return;
    const updated = plan.days.map((day) =>
      day.index === copyTargetIndex
        ? { ...day, masa1: cloneMeal(copySource.masa1), masa2: cloneMeal(copySource.masa2) }
        : day
    );
    updatePlan({ ...plan, days: updated });
    setCopySource(null);
    pushToast('Zi copiată');
  };

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[color:var(--color-muted)]">Plan 14 zile</p>
          <h2 className="flex items-center gap-2 font-display text-2xl">
            <Icon name="plan" className="h-6 w-6 text-[color:var(--color-accent)]" aria-hidden="true" />
            Plan alimentar
          </h2>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={handleAddDay}>
            Adaugă zi
          </Button>
          <Button variant="ghost" onClick={() => setShowReset(true)}>
            Resetează planul
          </Button>
        </div>
      </header>

      <div className="space-y-3">
        {sortedDays.map((day) => (
          <Card key={day.index}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-xs text-[color:var(--color-muted)]">Ziua {day.index}</p>
                <p className="text-sm font-semibold">{day.masa1.titlu}</p>
                <p className="text-xs text-[color:var(--color-muted)]">{day.masa2.titlu}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    const fallback = sortedDays.find((entry) => entry.index !== day.index);
                    setCopySource(day);
                    setCopyTargetIndex(fallback?.index ?? day.index);
                  }}
                >
                  Copiază ziua
                </Button>
                <Button variant="secondary" onClick={() => setEditingDay(structuredClone(day))}>
                  Editează
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={Boolean(editingDay)}
        title={editingDay ? `Editează Ziua ${editingDay.index}` : ''}
        onClose={() => setEditingDay(null)}
        footer={
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setEditingDay(null)}>
              Anulează
            </Button>
            <Button onClick={handleSave}>Salvează</Button>
          </div>
        }
      >
        {editingDay ? (
          <div className="space-y-6">
            <MealEditor
              label="Masa 1"
              meal={editingDay.masa1}
              onChange={(meal) => setEditingDay({ ...editingDay, masa1: meal })}
            />
            <MealEditor
              label="Masa 2"
              meal={editingDay.masa2}
              onChange={(meal) => setEditingDay({ ...editingDay, masa2: meal })}
            />
          </div>
        ) : null}
      </Modal>

      <Modal
        open={showReset}
        title="Confirmare resetare"
        onClose={() => setShowReset(false)}
        footer={
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setShowReset(false)}>
              Renunță
            </Button>
            <Button onClick={handleReset}>Confirmă</Button>
          </div>
        }
      >
        <p className="text-sm text-[color:var(--color-muted)]">
          Revii la planul default de 14 zile. Log-urile rămân neschimbate.
        </p>
      </Modal>

      <Modal
        open={Boolean(copySource)}
        title={copySource ? `Copiază Ziua ${copySource.index}` : ''}
        onClose={() => setCopySource(null)}
        footer={
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => setCopySource(null)}>
              Renunță
            </Button>
            <Button onClick={handleCopyDay}>Copiază</Button>
          </div>
        }
      >
        {copySource ? (
          sortedDays.filter((day) => day.index !== copySource.index).length > 0 ? (
            <Select
              label="Către ziua"
              value={String(copyTargetIndex)}
              onChange={(event) => setCopyTargetIndex(Number(event.target.value))}
            >
              {sortedDays
                .filter((day) => day.index !== copySource.index)
                .map((day) => (
                  <option key={day.index} value={day.index}>
                    Ziua {day.index}
                  </option>
                ))}
            </Select>
          ) : (
            <p className="text-sm text-[color:var(--color-muted)]">
              Ai nevoie de cel puțin două zile pentru copiere.
            </p>
          )
        ) : null}
      </Modal>
    </div>
  );
}

function MealEditor({
  label,
  meal,
  onChange
}: {
  label: string;
  meal: Meal;
  onChange: (meal: Meal) => void;
}) {
  const moveIngredient = (from: number, to: number) => {
    if (to < 0 || to >= meal.ingrediente.length) return;
    const next = [...meal.ingrediente];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange({ ...meal, ingrediente: next });
  };

  const updateIngredient = (id: string, patch: Partial<Ingredient>) => {
    onChange({
      ...meal,
      ingrediente: meal.ingrediente.map((item) => (item.id === id ? { ...item, ...patch } : item))
    });
  };

  return (
    <details className="rounded-[var(--radius-card)] border border-[color:var(--color-border)] p-3" open>
      <summary className="cursor-pointer text-sm font-semibold">{label}</summary>
      <div className="mt-3 space-y-3">
        <div className="grid gap-3 md:grid-cols-2">
          <Input
            label="Titlu"
            value={meal.titlu}
            onChange={(event) => onChange({ ...meal, titlu: event.target.value })}
          />
          <Input
            label="Ora implicită"
            value={meal.oraImplicita}
            onChange={(event) => onChange({ ...meal, oraImplicita: event.target.value })}
            placeholder="HH:mm"
          />
          <Input
            label="Calorii estimate"
            type="number"
            value={meal.caloriiEstimate}
            onChange={(event) => onChange({ ...meal, caloriiEstimate: Number(event.target.value) })}
          />
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <Input
            label="Prep (minute)"
            type="number"
            value={meal.reteta.prepMinute}
            onChange={(event) =>
              onChange({ ...meal, reteta: { ...meal.reteta, prepMinute: Number(event.target.value) } })
            }
          />
          <Input
            label="Gătit (minute)"
            type="number"
            value={meal.reteta.cookMinute}
            onChange={(event) =>
              onChange({ ...meal, reteta: { ...meal.reteta, cookMinute: Number(event.target.value) } })
            }
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">Ingrediente</p>
          {meal.ingrediente.map((ingredient, index) => (
            <div
              key={ingredient.id}
              className="grid gap-2 rounded-[var(--radius-card)] border border-[color:var(--color-border)] p-3 md:grid-cols-[1fr_120px_110px_1fr_90px]"
            >
              <Input
                label="Nume"
                value={ingredient.nume}
                onChange={(event) => updateIngredient(ingredient.id, { nume: event.target.value })}
              />
              <Input
                label="Cantitate"
                type="number"
                value={ingredient.cantitate}
                onChange={(event) =>
                  updateIngredient(ingredient.id, { cantitate: Number(event.target.value) })
                }
              />
              <Select
                label="Unitate"
                value={ingredient.unitate}
                onChange={(event) => updateIngredient(ingredient.id, { unitate: event.target.value as Unit })}
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </Select>
              <Input
                label="Notă"
                value={ingredient.note ?? ''}
                onChange={(event) => updateIngredient(ingredient.id, { note: event.target.value })}
              />
              <div className="flex items-end gap-2">
                <Button
                  variant="ghost"
                  onClick={() => moveIngredient(index, index - 1)}
                  aria-label="Mută ingredientul în sus"
                >
                  ↑
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => moveIngredient(index, index + 1)}
                  aria-label="Mută ingredientul în jos"
                >
                  ↓
                </Button>
              </div>
            </div>
          ))}
          <Button
            variant="secondary"
            onClick={() =>
              onChange({
                ...meal,
                ingrediente: [
                  ...meal.ingrediente,
                  {
                    id: crypto.randomUUID(),
                    nume: 'Ingredient',
                    cantitate: 0,
                    unitate: 'g'
                  }
                ]
              })
            }
          >
            Adaugă ingredient
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">Pași rețetă</p>
          {meal.reteta.pasi.map((pas, index) => (
            <Input
              key={`${meal.id}-pas-${index}`}
              value={pas}
              onChange={(event) => {
                const next = [...meal.reteta.pasi];
                next[index] = event.target.value;
                onChange({ ...meal, reteta: { ...meal.reteta, pasi: next } });
              }}
            />
          ))}
          <Button
            variant="secondary"
            onClick={() => onChange({ ...meal, reteta: { ...meal.reteta, pasi: [...meal.reteta.pasi, ''] } })}
          >
            Adaugă pas
          </Button>
        </div>
      </div>
    </details>
  );
}
