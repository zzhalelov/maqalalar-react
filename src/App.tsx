import {useMemo} from 'react';
import ReactMarkdown from 'react-markdown';
import {Calendar, User, Printer, BookOpen} from 'lucide-react';

const ARTICLE_DATA = {
    title: "Влияние распределенных систем на обработку больших массивов данных",
    category: "РАСПРЕДЕЛЕННЫЕ СИСТЕМЫ • BIG DATA • АРХИТЕКТУРА",
    author: "Иванов И. И., Петров П. П.",
    date: "2026-05-12",
    issue: "Выпуск № 4 (128) • Май 2026",
    abstract: "В данной монографии рассматриваются актуальные подходы к организации конвейеров обработки данных и оптимизации нагрузки на узлы сети...",
    content: `
Современные типы веб-приложений требуют масштабируемой архитектуры обработчиков. В монографии анализируются фундаментальные паттерны декомпозиции данных и распределения нагрузок.

## Архитектура конвейера

Распределение вычислительных процессов позволяет снизить задержки сети и повысить устойчивость узлов. Для достижения высокой пропускной способности применяются следующие подходы:

* **Изоляция компонентов**: Каждый узел выполняет независимый расчет без прямой блокировки соседних ресурсов.
* **Динамическая балансировка**: Нагрузка распределяется в режиме реального времени.

Конфигурационный файл базового узла представлен ниже:

\`\`\`json
{
  "status": "active",
  "nodes": 4,
  "loadBalancer": "round-robin"
}
\`\`\`

## Заключение

Применение предложенных подходов гарантирует отклик системы в пределах нормы даже при высоких пиковых нагрузках, создавая надежный фундамент для построения отказоустойчивых распределенных инфраструктур.
  `
};

export default function App() {
    // Вычисляем оглавление с помощью useMemo без использования useEffect и useState
    const headings = useMemo(() => {
        const matches = Array.from(ARTICLE_DATA.content.matchAll(/(#{2,3})\s+(.+)/g));
        return matches.map((match) => ({
            id: match[2].toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, ''),
            text: match[2],
            level: match[1].length,
        }));
    }, []);

    return (
        <div className="w-full text-[#1a1a1a] font-serif antialiased">
            {/* Шапка издания */}
            <header className="text-center border-b-4 border-double border-[#1a1a1a] pb-4 mb-6">
                <div
                    className="flex justify-between items-center text-xs font-sans uppercase tracking-widest text-[#555555] border-b border-[#1a1a1a] pb-1.5 mb-3">
                    <span>{ARTICLE_DATA.issue}</span>
                    <span>Официальный вестник научных публикаций</span>
                    <span>Цена: Бесплатно</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight font-serif text-[#1a1a1a] my-2">
                    Академический Вестник
                </h1>

                <div className="border-t border-[#1a1a1a] pt-1 mt-2 text-xs font-sans italic text-[#555555]">
                    Ежемесячное научное монографическое издание
                </div>
            </header>

            {/* Основная полоса */}
            <main>
                {/* Панель функций */}
                <div
                    className="flex justify-between items-center border-b border-[#1a1a1a] pb-2 mb-6 font-sans text-xs uppercase tracking-wider text-[#444444]">
                    <span className="font-bold">{ARTICLE_DATA.category}</span>
                    <button
                        onClick={() => window.print()}
                        className="flex items-center gap-1.5 text-[#1a1a1a] hover:opacity-70 font-semibold cursor-pointer transition-opacity no-print"
                    >
                        <Printer className="w-4 h-4"/> Печать / PDF
                    </button>
                </div>

                {/* Заголовок статьи */}
                <div className="mb-6 text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-extrabold leading-tight text-[#1a1a1a] font-serif mb-4">
                        {ARTICLE_DATA.title}
                    </h2>

                    <div
                        className="flex justify-center items-center gap-6 text-xs font-sans uppercase tracking-wider text-[#444444] border-y border-[#1a1a1a] py-2">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5"/> {ARTICLE_DATA.author}
            </span>
                        <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5"/> {ARTICLE_DATA.date}
            </span>
                    </div>
                </div>

                {/* Сетка: Аннотация и Оглавление */}
                <div className="grid md:grid-cols-3 gap-6 mb-8 pb-6 border-b border-[#cccccc] max-w-3xl mx-auto">
                    {/* Аннотация */}
                    <div
                        className="md:col-span-2 bg-[#f4eee2] p-4 border-l-4 border-[#1a1a1a] italic text-[#222222] text-sm leading-relaxed">
            <span
                className="not-italic font-sans text-[10px] font-bold uppercase tracking-widest block mb-1 text-[#555555]">
              Вводная аннотация
            </span>
                        {ARTICLE_DATA.abstract}
                    </div>

                    {/* Оглавление */}
                    {headings.length > 0 && (
                        <div className="border border-[#1a1a1a] p-4 bg-[#faf7f0]">
                            <div
                                className="flex items-center gap-1.5 font-sans font-bold uppercase text-[11px] tracking-wider mb-2 text-[#1a1a1a] border-b border-[#1a1a1a] pb-1">
                                <BookOpen className="w-3.5 h-3.5"/> Содержание
                            </div>
                            <ul className="space-y-1 font-sans text-xs text-[#222222]">
                                {headings.map((h, idx) => (
                                    <li key={idx} style={{paddingLeft: h.level === 3 ? '0.75rem' : '0'}}>
                                        <a href={`#${h.id}`} className="hover:underline text-[#1a1a1a]">
                                            • {h.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Текст статьи в 1 колонку */}
                <article className="max-w-3xl mx-auto text-justify leading-relaxed text-[#1a1a1a]">
                    <ReactMarkdown
                        components={{
                            h2: ({children}) => (
                                <h3 className="text-2xl font-bold font-serif text-[#1a1a1a] mt-8 mb-4 border-b-2 border-[#1a1a1a] pb-1 text-left uppercase tracking-wide">
                                    {children}
                                </h3>
                            ),
                            h3: ({children}) => (
                                <h4 className="text-xl font-bold font-serif text-[#1a1a1a] mt-6 mb-3 text-left italic">
                                    {children}
                                </h4>
                            ),
                            p: ({children}) => (
                                <p className="mb-5 leading-relaxed text-justify text-lg">
                                    {children}
                                </p>
                            ),
                            ul: ({children}) => (
                                <ul className="list-disc list-inside space-y-2 my-4 text-left font-sans text-sm bg-[#f5f0e6] p-4 border-l-4 border-[#1a1a1a]">
                                    {children}
                                </ul>
                            ),
                            code: ({children}) => (
                                <code className="bg-[#eee8dd] text-[#1a1a1a] px-1.5 py-0.5 rounded font-mono text-sm">
                                    {children}
                                </code>
                            ),
                            pre: ({children}) => (
                                <pre
                                    className="bg-[#1a1a1a] text-[#f8f8f2] p-4 rounded-sm overflow-x-auto font-mono text-sm my-6 text-left">
                  {children}
                </pre>
                            ),
                        }}
                    >
                        {ARTICLE_DATA.content}
                    </ReactMarkdown>
                </article>
            </main>

            {/* Подвал */}
            <footer
                className="border-t-4 border-double border-[#1a1a1a] pt-4 mt-12 text-center text-xs font-sans text-[#555555]">
                <p>© 2026 «Академический Вестник». Все права защищены. Отпечатано в типографии VAU.</p>
            </footer>
        </div>
    );
}