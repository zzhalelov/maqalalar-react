import {useState} from 'react';
import {Link} from 'react-router-dom';
import {articles} from '../data/articles';
import {Search, Calendar, User} from 'lucide-react';

export function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredArticles = articles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div style={{maxWidth: '960px', margin: '0 auto', padding: '40px 20px'}}>

            {/* Шапка газеты */}
            <header style={{
                textAlign: 'center',
                borderBottom: '3px double #1a1a1a',
                paddingBottom: '20px',
                marginBottom: '30px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #1a1a1a',
                    paddingBottom: '8px',
                    marginBottom: '15px',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    <span>Выпуск №1</span>
                    <span>Научные труды & Монографии</span>
                    <span>2026 год</span>
                </div>

                <h1 style={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    fontSize: '3.2rem',
                    fontWeight: 800,
                    margin: '10px 0',
                    letterSpacing: '-0.5px'
                }}>
                    АКАДЕМИЧЕСКИЙ ВЕСТНИК
                </h1>
                <p style={{fontStyle: 'italic', color: '#555', margin: 0, fontSize: '0.95rem'}}>
                    Официальный портал публикации научных исследований и монографий
                </p>
            </header>

            {/* Поиск */}
            <div style={{position: 'relative', marginBottom: '40px'}}>
                <Search style={{position: 'absolute', left: '12px', top: '10px', color: '#555'}} size={18}/>
                <input
                    type="text"
                    placeholder="Поиск по архиву публикаций, ключевым словам или тегам..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px 10px 10px 40px',
                        border: '1px solid #1a1a1a',
                        backgroundColor: '#f4f1ea',
                        color: '#1a1a1a',
                        fontFamily: '"Merriweather", serif',
                        fontSize: '0.9rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                    }}
                />
            </div>

            {/* Список монографий */}
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px'}}>
                {filteredArticles.map((article) => (
                    <article
                        key={article.id}
                        style={{
                            borderBottom: '1px solid #ccc',
                            paddingBottom: '25px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div>
                            <div style={{
                                marginBottom: '10px',
                                fontSize: '0.8rem',
                                textTransform: 'uppercase',
                                color: '#666',
                                letterSpacing: '0.5px'
                            }}>
                                {article.tags.join(' • ')}
                            </div>

                            <h2 style={{
                                fontFamily: '"Playfair Display", serif',
                                margin: '0 0 12px 0',
                                fontSize: '1.6rem',
                                lineHeight: '1.25'
                            }}>
                                <Link
                                    to={`/article/${article.id}`}
                                    style={{color: '#1a1a1a', textDecoration: 'none'}}
                                >
                                    {article.title}
                                </Link>
                            </h2>

                            <p style={{color: '#333', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '16px'}}>
                                {article.abstract}
                            </p>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            color: '#555',
                            fontSize: '0.85rem',
                            borderTop: '1px solid #e0e0e0',
                            paddingTop: '10px',
                            fontStyle: 'italic'
                        }}>
              <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                <User size={14}/> {article.authors}
              </span>
                            <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                <Calendar size={14}/> {article.date}
              </span>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}