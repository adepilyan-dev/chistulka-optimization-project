export interface WorkCase {
  id: number;
  category: "sofa" | "armchair" | "mattress" | "carpet" | "auto";
  categoryLabel: string;
  title: string;
  description: string;
  stain: string;
  beforeImg: string;
  afterImg: string;
  result: string;
}

export const WORKS: WorkCase[] = [
  {
    id: 1,
    category: "sofa",
    categoryLabel: "Диван",
    title: "Угловой диван-кровать",
    description: "Светло-бежевый угловой диван с механизмом трансформации",
    stain: "Общее загрязнение, потемнение ткани",
    beforeImg: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/50fbbd24-c251-48fe-8660-cf1f26f10ebe.jpg",
    afterImg: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/50fbbd24-c251-48fe-8660-cf1f26f10ebe.jpg",
    result: "Ткань восстановлена, пятна полностью удалены",
  },
  {
    id: 2,
    category: "armchair",
    categoryLabel: "Кресло",
    title: "Диван-кресло розовая ткань",
    description: "Классическое двухместное кресло-диван на деревянном каркасе",
    stain: "Сильное загрязнение по всей поверхности",
    beforeImg: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/bb94de48-e48b-4a5f-99ac-1fc0554061de.jpg",
    afterImg: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/bb94de48-e48b-4a5f-99ac-1fc0554061de.jpg",
    result: "Цвет восстановлен, ткань стала мягкой и чистой",
  },
  {
    id: 3,
    category: "mattress",
    categoryLabel: "Матрас",
    title: "Двуспальный матрас",
    description: "Белый стёганый матрас 160×200",
    stain: "Жёлтые пятна, органические загрязнения",
    beforeImg: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/c744cb1b-45c4-4433-a5e7-1d7c76f2de36.jpg",
    afterImg: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/c744cb1b-45c4-4433-a5e7-1d7c76f2de36.jpg",
    result: "Матрас обеззаражен, пятна выведены, запах устранён",
  },
  {
    id: 4,
    category: "armchair",
    categoryLabel: "Кресло",
    title: "Двухместный диван на деревянных подлокотниках",
    description: "Кожаный диван бежевого цвета с деревянными элементами",
    stain: "Жирные пятна, потёртости",
    beforeImg: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/afe8ef8c-3b00-4ad3-a1de-ac6513e3d373.jpg",
    afterImg: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/afe8ef8c-3b00-4ad3-a1de-ac6513e3d373.jpg",
    result: "Кожа очищена и обработана кондиционером",
  },
  {
    id: 5,
    category: "sofa",
    categoryLabel: "Диван",
    title: "Угловой диван малиновый",
    description: "Угловой диван-кровать в малиновом цвете",
    stain: "Пятна от еды, общее загрязнение",
    beforeImg: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/82cd0d9b-9dc9-4044-a9fb-89e29443c354.jpg",
    afterImg: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/82cd0d9b-9dc9-4044-a9fb-89e29443c354.jpg",
    result: "Цвет обновлён, ткань свежая и чистая",
  },
  {
    id: 6,
    category: "sofa",
    categoryLabel: "Диван",
    title: "Угловой диван голубой велюр",
    description: "Большой угловой диван из велюра голубого цвета",
    stain: "Тёмное пятно, общее загрязнение и потемнение велюра",
    beforeImg: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/beabebe7-a41a-41b7-82f2-3ee10b08b86b.jpg",
    afterImg: "https://cdn.poehali.dev/projects/4c38c16c-b9b4-483b-8a85-5827a4cc2141/bucket/beabebe7-a41a-41b7-82f2-3ee10b08b86b.jpg",
    result: "Велюр восстановлен, цвет стал ярким и равномерным",
  },
];

export const WORK_CATEGORIES = [
  { key: "all", label: "Все" },
  { key: "sofa", label: "Диваны" },
  { key: "armchair", label: "Кресла" },
  { key: "mattress", label: "Матрасы" },
  { key: "carpet", label: "Ковры" },
  { key: "auto", label: "Авто" },
] as const;