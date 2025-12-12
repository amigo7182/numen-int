import { motion } from "motion/react";
import { User, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import advisorImage from "figma:asset/e3aed010b4c07b5ae92cfccf7567fdd03f4ea41f.png";
import advisor1 from "figma:asset/23be4f67133d994a8f3678bd1b80308be949a6aa.png";
import advisor2 from "figma:asset/d8865935d782126f1021b530664a1c472b250bf1.png";
import advisor3 from "figma:asset/430770311d3651dba1eba2345fcb92ba63ccfbb0.png";

const teamMemberImages = [advisor1, advisor2, advisor3];
const teamMemberLinkedIn = [
  "https://www.linkedin.com/in/talgat-kabdygali-820895195/",
  "https://www.linkedin.com/in/aidynbekmussa/",
  "https://www.linkedin.com/in/sagitbakirov/",
];

export function TeamSection() {
  const { t } = useLanguage();

  const teamMembers = t("team.members") as unknown as Array<{
    name: string;
    role: string;
    expertise: string;
    education: string;
  }>;
  return (
    <section
      id="team"
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
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 border border-teal-400/30 rounded-full mb-6"
            >
              <span className="text-teal-400 tracking-wider">
                {t("team.badge")}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-white/90 mb-6"
            >
              {t("team.title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-white/60 max-w-3xl mx-auto"
            >
              {t("team.description")}
            </motion.p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-lg p-6 hover:border-teal-400/30 transition-all duration-300 h-full">
                  {/* Avatar */}
                  {teamMemberImages[index] ? (
                    <div className="w-20 h-20 rounded-full overflow-hidden border border-teal-400/30 mb-4 group-hover:border-teal-400/50 transition-all">
                      <img
                        src={teamMemberImages[index]}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400/20 to-blue-500/20 border border-teal-400/30 flex items-center justify-center mb-4 group-hover:border-teal-400/50 transition-all">
                      <User className="w-10 h-10 text-teal-400/60" />
                    </div>
                  )}

                  {/* Name & Role */}
                  <h3 className="text-white/90 mb-1">{member.name}</h3>
                  <p className="text-teal-400/80 mb-4">{member.role}</p>

                  {/* Expertise */}
                  <div className="mb-4">
                    <p className="text-white/50 mb-2">{t("team.expertise")}</p>
                    <p className="text-white/70">{member.expertise}</p>
                  </div>

                  {/* Education */}
                  <div className="mb-4">
                    <p className="text-white/50 mb-2">{t("team.education")}</p>
                    <p className="text-white/70">{member.education}</p>
                  </div>

                  {/* Contact Icons */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
                    <button
                      onClick={() =>
                        window.open(teamMemberLinkedIn[index], "_blank")
                      }
                      className="text-white/40 hover:text-teal-400 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </button>
                    <button className="text-white/40 hover:text-teal-400 transition-colors">
                      <Mail className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Advisory Board Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="backdrop-blur-lg bg-teal-400/5 border border-teal-400/20 rounded-lg p-8">
              <h4 className="text-white/90 mb-3">{t("team.advisoryTitle")}</h4>
              <p className="text-white/60 mb-4">
                {t("team.advisoryDescription")}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-white/50">
                {(t("team.institutions") as unknown as string[]).map(
                  (institution, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded"
                    >
                      {institution}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
