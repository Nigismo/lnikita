import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { courses } from "@/data/courses";

const CourseCards = () => {
  return (
    <section id="courses" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Featured Courses
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Choose a course and start learning today. All courses are hosted on Stepik with lifetime access.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {courses.map((course, i) => (
            <motion.div
              key={course.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="group relative h-full overflow-hidden border-border/50 bg-card transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
                <CardHeader>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <course.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="font-display text-xl">{course.title}</CardTitle>
                  <CardDescription className="text-muted-foreground line-clamp-3">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
  );
};

export default CourseCards;
