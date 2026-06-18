// В форме заявки
<div className="flex items-start gap-3">
  <Checkbox
    id="consent"
    size="lg"
    checked={consent}
    onCheckedChange={setConsent}
    className="mt-0.5"
  />
  <div>
    <label htmlFor="consent" className="text-sm font-medium">
      Согласие на обработку персональных данных
    </label>
    <p className="text-xs text-gray-500">
      Нажимая кнопку, вы даёте согласие на обработку персональных данных
    </p>
  </div>
</div>

// Выбор дополнительных услуг
const [extras, setExtras] = React.useState<string[]>([])

<div className="space-y-3">
  <div className="flex items-center gap-3">
    <Checkbox
      id="express"
      size="lg"
      checked={extras.includes("express")}
      onCheckedChange={(checked) => {
        if (checked) setExtras([...extras, "express"])
        else setExtras(extras.filter((e) => e !== "express"))
      }}
    />
    <label htmlFor="express" className="text-sm font-medium">
      Экспресс-сушка (1–2 ч) +800 ₽
    </label>
  </div>
  <div className="flex items-center gap-3">
    <Checkbox
      id="deodorant"
      size="lg"
      checked={extras.includes("deodorant")}
      onCheckedChange={(checked) => {
        if (checked) setExtras([...extras, "deodorant"])
        else setExtras(extras.filter((e) => e !== "deodorant"))
      }}
    />
    <label htmlFor="deodorant" className="text-sm font-medium">
      Устранение запахов +500 ₽
    </label>
  </div>
  <div className="flex items-center gap-3">
    <Checkbox
      id="disinfect"
      size="lg"
      checked={extras.includes("disinfect")}
      onCheckedChange={(checked) => {
        if (checked) setExtras([...extras, "disinfect"])
        else setExtras(extras.filter((e) => e !== "disinfect"))
      }}
    />
    <label htmlFor="disinfect" className="text-sm font-medium">
      Дезинфекция +400 ₽
    </label>
  </div>
</div>

// В фильтрах
<div className="flex flex-wrap gap-4">
  <div className="flex items-center gap-2">
    <Checkbox id="filter-sofa" size="sm" />
    <label htmlFor="filter-sofa" className="text-sm">Диваны</label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="filter-chair" size="sm" />
    <label htmlFor="filter-chair" className="text-sm">Кресла</label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="filter-mattress" size="sm" />
    <label htmlFor="filter-mattress" className="text-sm">Матрасы</label>
  </div>
</div>