import { useState, useMemo } from 'preact/hooks';
import Fuse from 'fuse.js';

interface Question {
  id: string;
  slug: string;
  data: {
    title?: string;
    category: string;
    difficulty: string;
    tags?: string[];
  };
  body: string;
}

interface SearchEngineProps {
  questions: Question[];
}

export default function SearchEngine({ questions }: SearchEngineProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Initialize Fuse.js for fuzzy search
  const fuse = useMemo(() => new Fuse(questions, {
    keys: [
      { name: 'data.title', weight: 0.8 },
      { name: 'data.category', weight: 0.6 },
      { name: 'data.tags', weight: 0.4 },
      { name: 'body', weight: 0.2 }
    ],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2
  }), [questions]);

  // Filter and search logic
  const filteredResults = useMemo(() => {
    let results = questions;
    
    // Category filter
    if (selectedCategory !== 'all') {
      results = results.filter(q => q.data.category === selectedCategory);
    }
    
    // Search query
    if (query.trim()) {
      const searchResults = fuse.search(query);
      results = searchResults.map(result => result.item);
    }
    
    return results.slice(0, 12); // Limit to 12 results
  }, [query, selectedCategory, questions, fuse]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(questions.map(q => q.data.category));
    return Array.from(cats).sort();
  }, [questions]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'elementary': return '#10b981';
      case 'teen': return '#f59e0b';
      case 'college': return '#ef4444';
      case 'graduate': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  return (
    <div className="search-engine">
      <div className="search-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search apologetics questions..."
            value={query}
            onChange={(e) => setQuery(e.currentTarget.value)}
            className="search-input"
            aria-label="Search questions"
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="category-filter">
          <label htmlFor="category-select" className="sr-only">Filter by category</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.currentTarget.value)}
            className="category-select"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="search-results">
        {filteredResults.length === 0 ? (
          <div className="no-results">
            <p>No questions found. Try adjusting your search or category filter.</p>
            <p><em>Suggestion: Try searching for "creation", "evolution", "suffering", or "AI"</em></p>
          </div>
        ) : (
          <div className="questions-grid">
            {filteredResults.map((question) => (
              <div key={question.id} className="question-card">
                <h3 className="question-title">
                  {question.data.title || question.slug}
                </h3>
                <div className="question-meta">
                  <span className="category-badge">
                    {question.data.category}
                  </span>
                  <span 
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(question.data.difficulty) }}
                  >
                    {question.data.difficulty}
                  </span>
                </div>
                {question.data.tags && (
                  <div className="question-tags">
                    {question.data.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .search-engine {
          max-width: 1000px;
          margin: 0 auto;
        }

        .search-controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
        }

        .search-bar {
          flex: 1;
          min-width: 300px;
          position: relative;
        }

        .search-input {
          width: 100%;
          padding: 1rem 3rem 1rem 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 50px;
          font-size: 1rem;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .search-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .search-icon {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }

        .category-filter {
          min-width: 200px;
        }

        .category-select {
          width: 100%;
          padding: 1rem;
          border: 2px solid #e2e8f0;
          border-radius: 50px;
          font-size: 1rem;
          background: white;
          cursor: pointer;
        }

        .questions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .question-card {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          border-left: 4px solid #667eea;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
        }

        .question-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        .question-title {
          color: #2d3748;
          margin-bottom: 1rem;
          font-weight: 600;
          line-height: 1.3;
        }

        .question-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .category-badge {
          background: #f7fafc;
          color: #4a5568;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          text-transform: capitalize;
        }

        .difficulty-badge {
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .question-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }

        .tag {
          background: #edf2f7;
          color: #4a5568;
          padding: 0.2rem 0.6rem;
          border-radius: 12px;
          font-size: 0.75rem;
        }

        .no-results {
          text-align: center;
          padding: 3rem;
          color: #718096;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (max-width: 768px) {
          .search-controls {
            flex-direction: column;
          }
          
          .search-bar {
            min-width: auto;
          }

          .questions-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}