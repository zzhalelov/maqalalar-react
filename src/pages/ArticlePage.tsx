import {useParams, Link} from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import {articles} from '../data/articles';
import {ArrowLeft, Calendar, User, Printer} from 'lucide-react';

export function ArticlePage() {
    const {id} = useParams<{ id: string }>();
    const article = articles.find((a) => a.id === id);

    if (!article) {
        return (
            <div style={{textAlign: 'center', padding: '50px'}}>
                <h2>Статья не найдена в архиве</h2>
                <Link to="/" style={{color: '#1a1a1a', textDecoration: 'underline'}}>Вернуться к изданию</Link>
            </div>
        );
    }

    const headings = article.content
        .split('\n')
        .filter((line) => line.startsWith('# ') || line.startsWith('## '))
        .map((line) => {
            const level = line.startsWith('## ') ? 2 : 1;
            const text = line.replace(/^#+\s*/, '');
            return {level, text};
        });

    // Функция вызова печати / сохранения в PDF
    const handlePrint = () => {
        window.print();
    };

    return (
        <div style={{maxWidth: '1000px', margin: '0 auto', padding: '40px 20px'}}>

            {/* Верхний блок навигации и действия (скрывается при печати благодаря классу no-print) */}
            <div className="no-print"
                 style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                <Link
                    to="/"
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: '#1a1a1a',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}
                >
                    <ArrowLeft size={16}/> Назад к выпуску
                </Link>

                <button
                    onClick={handlePrint}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: '#1a1a1a',
                        color: '#fbf9f5',
                        border: 'none',
                        padding: '8px 16px',
                        fontFamily: '"Merriweather", serif',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        borderRadius: '4px'
                    }}
                >
                    <Printer size={16}/> Печать / Сохранить в PDF
                </button>
            </div>

            {/* Заголовок монографии */}
            <header style={{
                textAlign: 'center',
                borderBottom: '1px solid #1a1a1a',
                paddingBottom: '25px',
                marginBottom: '35px'
            }}>
                <div style={{
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: '#666',
                    marginBottom: '10px'
                }}>
                    Научная монография
                </div>
                <h1 style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: '2.5rem',
                    margin: '0 0 15px 0',
                    lineHeight: '1.2'
                }}>
                    {article.title}
                </h1>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '30px',
                    color: '#444',
                    fontSize: '0.95rem',
                    fontStyle: 'italic'
                }}>
          <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
            <User size={16}/> Автор(ы): {article.authors}
          </span>
                    <span style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
            <Calendar size={16}/> Опубликовано: {article.date}
          </span>
                </div>
            </header>

            {/* Сетка: Оглавление + Текст */}
            <div style={{display: 'grid', gridTemplateColumns: headings.length > 0 ? '240px 1fr' : '1fr', gap: '40px'}}>

                {/* Оглавление (автоматически скроется при печати) */}
                {headings.length > 0 && (
                    <aside className="no-print" style={{position: 'sticky', top: '20px', alignSelf: 'start'}}>
                        <div style={{
                            border: '1px solid #1a1a1a',
                            padding: '15px',
                            backgroundColor: '#f4f1ea'
                        }}>
                            <h3 style={{
                                fontFamily: '"Playfair Display", serif',
                                margin: '0 0 10px 0',
                                fontSize: '1.1rem',
                                borderBottom: '1px solid #1a1a1a',
                                paddingBottom: '5px'
                            }}>
                                Содержание
                            </h3>
                            <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
                                {headings.map((h, idx) => (
                                    <li
                                        key={idx}
                                        style={{
                                            marginBottom: '6px',
                                            paddingLeft: h.level === 2 ? '10px' : '0px',
                                            fontSize: '0.85rem',
                                            lineHeight: '1.4'
                                        }}
                                    >
                                        • {h.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                )}

                {/* Текст статьи */}
                <main style={{maxWidth: '680px', fontSize: '1.05rem', lineHeight: '1.8', color: '#222'}}>
                    {/* Резюме */}
                    <div style={{
                        borderTop: '1px solid #1a1a1a',
                        borderBottom: '1px solid #1a1a1a',
                        padding: '15px 0',
                        marginBottom: '30px',
                        fontStyle: 'italic',
                        fontSize: '0.95rem'
                    }}>
                        <strong>Резюме: </strong>{article.abstract}
                    </div>

                    <article>
                        <ReactMarkdown
                            components={{
                                img: ({src, alt, ...props}) => (
                                    <figure style={{margin: '25px 0', textAlign: 'center'}}>
                                        <img
                                            src={src}
                                            alt={alt || 'Иллюстрация к монографии'}
                                            {...props}
                                            style={{
                                                maxWidth: '100%',
                                                height: 'auto',
                                                filter: 'grayscale(30%)',
                                                border: '1px solid #1a1a1a',
                                                padding: '4px',
                                                backgroundColor: '#fff'
                                            }}
                                        />
                                        {alt && (
                                            <figcaption style={{
                                                fontSize: '0.85rem',
                                                fontStyle: 'italic',
                                                color: '#555',
                                                marginTop: '6px'
                                            }}>
                                                Рис. — {alt}
                                            </figcaption>
                                        )}
                                    </figure>
                                ),
                                h1: (props) => (
                                    <h1 {...props} style={{
                                        fontFamily: '"Playfair Display", serif',
                                        fontSize: '1.7rem',
                                        marginTop: '35px',
                                        borderBottom: '1px solid #1a1a1a',
                                        paddingBottom: '5px'
                                    }}/>
                                ),
                                h2: (props) => (
                                    <h2 {...props} style={{
                                        fontFamily: '"Playfair Display", serif',
                                        fontSize: '1.3rem',
                                        marginTop: '25px'
                                    }}/>
                                ),
                                p: (props) => (
                                    <p {...props} style={{marginBottom: '18px', textAlign: 'justify'}}/>
                                )
                            }}
                        >
                            {article.content}
                        </ReactMarkdown>
                    </article>
                </main>
            </div>
        </div>
    );
}