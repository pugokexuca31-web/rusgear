const FEATURES = [
  {
    title: 'Сертификация ГОСТ',
    text: 'Классы защиты подтверждены испытаниями. Документы предоставляем к каждой партии.',
  },
  {
    title: 'Опт от производителя',
    text: 'Прямые цены без посредников и гибкие условия для оптовых закупок.',
  },
  {
    title: 'Доставка СДЭК',
    text: 'Отгрузка по всей России, расчёт стоимости и сроков онлайн при оформлении.',
  },
  {
    title: 'Наличие на складе',
    text: 'Актуальные остатки, быстрая отгрузка крупных партий со склада.',
  },
];

export function Features() {
  return (
    <section className="container-rg py-16">
      <div className="grid gap-px bg-ink-200 md:grid-cols-4">
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className={`bg-white py-8 md:px-8 ${i === 0 ? 'md:pl-0' : ''} ${
              i === FEATURES.length - 1 ? 'md:pr-0' : ''
            }`}
          >
            <div className="mb-4 h-1 w-8 bg-accent-red" />
            <h3 className="text-sm font-bold uppercase tracking-wide text-ink-900">{f.title}</h3>
            <p className="mt-2 text-base leading-relaxed text-ink-500">{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
