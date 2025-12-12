import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2 } from 'lucide-react';
import { getArticleById, Article } from '../data/articles';
import ReactMarkdown from 'react-markdown';
import { useLanguage } from '../contexts/LanguageContext';

export function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (id) {
      const foundArticle = getArticleById(parseInt(id));
      if (foundArticle) {
        setArticle(foundArticle);
      } else {
        // Article not found, redirect to home
        navigate('/');
      }
    }
    // Scroll to top when article loads
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/60">Loading...</div>
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "border-red-500/30 bg-red-500/10 text-red-400";
      case "medium": return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";
      case "low": return "border-blue-500/30 bg-blue-500/10 text-blue-400";
      default: return "border-white/30 bg-white/10 text-white/60";
    }
  };

  return (
    <div className="min-h-screen py-32 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>{t('article.backButton')}</span>
        </motion.button>

        {/* Article Container */}
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-8 md:p-12 shadow-2xl"
        >
          {/* Article Header */}
          <div className="mb-8">
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className={`px-3 py-1 rounded border ${getPriorityColor(article.priority)}`}>
                {article.type}
              </div>
              <span className="px-3 py-1 rounded border border-white/10 bg-white/5 text-white/60">
                {article.category}
              </span>
              {article.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 rounded border border-teal-400/20 bg-teal-400/5 text-teal-400/80">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-white/90 mb-6">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-white/50 pb-6 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{t('article.author')}: {article.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} {t('article.readTime')}</span>
              </div>
              <button className="flex items-center space-x-2 hover:text-teal-400 transition-colors ml-auto">
                <Share2 className="w-4 h-4" />
                <span>{t('article.share')}</span>
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-white/70 leading-relaxed article-content">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-white/90 mt-12 mb-6 first:mt-0">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-white/90 mt-10 mb-4">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-white/90 mt-8 mb-3">{children}</h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="text-white/90 mt-6 mb-2">{children}</h4>
                  ),
                  p: ({ children }) => (
                    <p className="text-white/70 mb-4 leading-relaxed">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc list-inside mb-4 space-y-2 text-white/70">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal list-inside mb-4 space-y-2 text-white/70">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-white/70">{children}</li>
                  ),
                  strong: ({ children }) => (
                    <strong className="text-white/90">{children}</strong>
                  ),
                  em: ({ children }) => (
                    <em className="text-teal-400/80">{children}</em>
                  ),
                  hr: () => (
                    <hr className="border-white/10 my-8" />
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-teal-400/30 pl-4 italic text-white/60 my-6">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>
          </div>

          {/* Article Footer */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-white/50">
                <Tag className="w-4 h-4" />
                <span>{t('article.tags')}:</span>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="text-teal-400/80">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 border border-teal-400/50 text-teal-400 hover:bg-teal-400/10 transition-all rounded"
              >
                {t('article.readMoreArticles')}
              </button>
            </div>
          </div>
        </motion.article>

        {/* Related Articles Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12"
        >
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-8">
            <h3 className="text-white/90 mb-4">
              {t('article.moreTitle')}
            </h3>
            <p className="text-white/60">
              {t('article.moreDescription')}
            </p>
            <button
              onClick={() => {
                navigate('/');
                // Scroll to analysis section after navigation
                setTimeout(() => {
                  const element = document.getElementById('analysis');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="mt-6 px-6 py-3 bg-teal-400/20 border border-teal-400/50 text-teal-400 rounded hover:bg-teal-400/30 transition-all"
            >
              {t('article.viewAll')}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
