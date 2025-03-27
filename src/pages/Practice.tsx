import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2, Briefcase, Building2, Cpu } from 'lucide-react';

export default function Practice() {
  const categories = [
    {
      title: 'Technical Interview',
      description: 'Data structures, algorithms, and coding challenges',
      icon: Code2,
    },
    {
      title: 'Behavioral Interview',
      description: 'Leadership, teamwork, and problem-solving scenarios',
      icon: Briefcase,
    },
    {
      title: 'System Design',
      description: 'Architecture, scalability, and design patterns',
      icon: Cpu,
    },
    {
      title: 'Company Specific',
      description: 'Tailored questions for top companies',
      icon: Building2,
    },
  ];

  return (
    <div className="container py-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Choose Interview Type</h1>
        <p className="text-muted-foreground">Select the type of interview you want to practice</p>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, index) => (
          <Card key={index} className="cursor-pointer hover:bg-accent">
            <CardHeader>
              <div className="mb-4">
                <category.icon className="h-8 w-8" />
              </div>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Start Practice</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}