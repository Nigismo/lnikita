import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { courses } from "@/data/courses";

const Courses = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-24 lg:py-32">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-14 text-center"
            >
              <h1 className="font-display text-4xl font-bold sm:text-5xl">
                All Courses
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Choose a course and start learning today. All courses are hosted on Stepik with lifetime access.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {courses.map((course, i) => (
                <motion.div
                  key={course.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                >
                  <Card className="group relative h-full overflow-hidden border-border/50 bg-card transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                    <CardHeader>
                      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <course.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="font-display text-xl">{course.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {course.tagline}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-5 text-sm text-muted-foreground line-clamp-3">
                        {course.description}
                      </p>
                      <div className="flex gap-3">
                        <Button asChild size="sm">
                          <a href={course.link} target="_blank" rel="noopener noreferrer">
                            Enroll <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                          </a>
                        </Button>
                        <Button asChild variant="ghost" size="sm">
                          <Link to={`/courses/${course.slug}`}>Learn More</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
