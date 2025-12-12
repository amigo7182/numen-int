import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  TrendingUp,
  FileText,
  ArrowRight,
  Filter,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { articles, categories } from "../data/articles";
import { useLanguage } from "../contexts/LanguageContext";

export function CentralAsianAnalysisSection() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const filteredArticles =
    selectedCategory === "All"
      ? articles
      : articles.filter(
          (article) => article.category === selectedCategory,
        );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500/30 bg-red-500/10 text-red-400";
      case "medium":
        return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";
      case "low":
        return "border-blue-500/30 bg-blue-500/10 text-blue-400";
      default:
        return "border-white/30 bg-white/10 text-white/60";
    }
  };

  const navigate = useNavigate();

  return (
    <section
      id="analysis"
      className="min-h-screen flex items-center justify-center py-32 px-6"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-12 shadow-2xl"
        >
          {/* Header */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 border border-teal-400/30 rounded-full mb-6"
            >
              <span className="text-teal-400 tracking-wider">
                {t("analysis.badge")}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-white/90 mb-6"
            >
              {t("analysis.title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-white/60 max-w-3xl"
            >
              {t("analysis.description")}
            </motion.p>
          </div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Filter className="w-5 h-5 text-teal-400" />
              <span className="text-white/70">
                {t("analysis.filter")}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full border transition-all ${
                    selectedCategory === category
                      ? "bg-teal-400/20 border-teal-400/50 text-teal-400"
                      : "bg-white/5 border-white/10 text-white/60 hover:border-teal-400/30 hover:text-white/80"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-lg p-6 hover:border-teal-400/30 transition-all duration-300 h-full flex flex-col">
                  {/* Article Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`px-3 py-1 rounded border ${getPriorityColor(article.priority)}`}
                      >
                        {article.type}
                      </div>
                      <span className="px-3 py-1 rounded border border-white/10 bg-white/5 text-white/60">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white/90 mb-3 group-hover:text-teal-400 transition-colors">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-white/60 mb-6 flex-grow">
                    {article.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-4 text-white/50">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(
                            article.date,
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <button
                      className="flex items-center space-x-2 text-teal-400 hover:text-teal-300 transition-colors group/btn"
                      onClick={() =>
                        navigate(`/article/${article.id}`)
                      }
                    >
                      <span>{t("analysis.readMore")}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="backdrop-blur-lg bg-teal-400/5 border border-teal-400/20 rounded-lg p-6 text-center">
              <FileText className="w-8 h-8 text-teal-400 mx-auto mb-3" />
              <div className="text-white/90 mb-2">250+</div>
              <div className="text-white/60">
                {t("analysis.stats.digests")}
              </div>
            </div>
            <div className="backdrop-blur-lg bg-teal-400/5 border border-teal-400/20 rounded-lg p-6 text-center">
              <TrendingUp className="w-8 h-8 text-teal-400 mx-auto mb-3" />
              <div className="text-white/90 mb-2">89%</div>
              <div className="text-white/60">
                {t("analysis.stats.accuracy")}
              </div>
            </div>
            <div className="backdrop-blur-lg bg-teal-400/5 border border-teal-400/20 rounded-lg p-6 text-center">
              <Calendar className="w-8 h-8 text-teal-400 mx-auto mb-3" />
              <div className="text-white/90 mb-2">24/7</div>
              <div className="text-white/60">
                {t("analysis.stats.monitoring")}
              </div>
            </div>
          </motion.div>

          {/* Subscribe CTA */}
        </motion.div>
      </div>
    </section>
  );
}