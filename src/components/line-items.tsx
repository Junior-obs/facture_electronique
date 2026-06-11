import { useCallback } from "react"
import { Plus, Trash2, GripVertical } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import type { LineItem } from "../types"

interface LineItemsProps {
  items: LineItem[]
  currency: string
  onUpdate: (items: LineItem[]) => void
}

export function LineItems({ items, currency, onUpdate }: LineItemsProps) {
  const addItem = useCallback(() => {
    const newItem: LineItem = {
      id: crypto.randomUUID(),
      productName: "",
      description: "",
      quantity: 1,
      unitPrice: 0,
    }
    onUpdate([...items, newItem])
  }, [items, onUpdate])

  const removeItem = useCallback(
    (id: string) => {
      onUpdate(items.filter((item) => item.id !== id))
    },
    [items, onUpdate],
  )

  const updateItem = useCallback(
    (id: string, field: keyof Omit<LineItem, "id">, value: string | number) => {
      onUpdate(
        items.map((item) => {
          if (item.id !== id) return item
          const parsed = typeof value === "string" && field !== "description" && field !== "productName"
            ? value === ""
              ? 0
              : Number.parseFloat(value) || 0
            : value
          return { ...item, [field]: parsed }
        }),
      )
    },
    [items, onUpdate],
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">Lignes de facture</CardTitle>
          <Button variant="secondary" size="sm" onClick={addItem} type="button">
            <Plus className="h-3.5 w-3.5" />
            Ajouter
          </Button>
        </CardHeader>
        <CardContent className="space-y-0 p-0">
          <div className="hidden sm:grid sm:grid-cols-[24px_140px_1fr_100px_120px_100px] gap-3 px-5 py-2 bg-muted/50 border-b border-border">
            <div />
            <Label>Produit</Label>
            <Label>Description</Label>
            <Label>Qté</Label>
            <Label>Prix unit. ({currency})</Label>
            <Label>Total ({currency})</Label>
          </div>

          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-[24px_140px_1fr_100px_120px_100px] gap-2 sm:gap-3 px-5 py-3 border-b border-border last:border-b-0 items-center"
              >
                <div className="hidden sm:flex text-muted-foreground">
                  <GripVertical className="h-4 w-4" />
                </div>
                <Input
                  placeholder="Site web"
                  value={item.productName}
                  onChange={(e) => updateItem(item.id, "productName", e.target.value)}
                  className="h-8 text-sm"
                />
                <Input
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                  className="h-8 text-sm"
                />
                <Input
                  type="number"
                  min="0"
                  step="1"
                  value={item.quantity || ""}
                  onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                  className="h-8 text-sm text-center"
                />
                <Input
                  type="number"
                  min="0"
                  step="any"
                  value={item.unitPrice}
                  onChange={(e) => updateItem(item.id, "unitPrice", e.target.value)}
                  className="h-8 text-sm text-right"
                />
                <div className="flex items-center justify-between sm:justify-end gap-2">
                  <span className="text-sm font-medium tabular-nums">
                    {currency}{" "}
                    {(item.quantity * item.unitPrice).toLocaleString()}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    type="button"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-sm text-muted-foreground mb-3">Aucune ligne de facture</p>
              <Button variant="secondary" size="sm" onClick={addItem} type="button">
                <Plus className="h-3.5 w-3.5" />
                Ajouter un premier article
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
