import { JobInfoBase } from "@/modules/job-dashboard";

export interface BackgroundJobInfo extends JobInfoBase {
    backgroundJobType: "BACKGROUND";
}

export interface HttpRequestJobInfo extends JobInfoBase {
    backgroundJobType: "HTTP";
}

export function generateMockJobs(): JobInfoBase[] {
    const jobs: JobInfoBase[] = [];
    const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    const startTimestamp = Date.now(); // Текущая метка времени
    const jobCount = random(1, 5); // Генерируем от 1 до 5 задач

    for (let i = 0; i < jobCount; i++) {
        const newStartTimestamp = startTimestamp - random(0, 5) * 1000;
        const jobName = `Job${i}`;
        const job: BackgroundJobInfo = {
            id: crypto.randomUUID(),
            name: jobName,
            startTimestamp: newStartTimestamp,
            backgroundJobType: "BACKGROUND",
            isFinished: Math.random() < 0.5, // 50% что задача завершена
        };

        const extraJobs = random(0, 2);
        for (let j = 0; j < extraJobs; j++) {
            jobs.push({
                ...job,
                id: crypto.randomUUID(),
                name: `${jobName}_extra${j}`,
            });
        }

        const extraJobs2 = random(0, 2);
        for (let j = 0; j < extraJobs2; j++) {
            jobs.push({
                ...job,
                id: crypto.randomUUID(),
                name: `${jobName}_extra${i}`,
            });
        }

        jobs.push(job);
    }

    for (let i = 0; i < jobCount; i++) {
        const newStartTimestamp = startTimestamp - random(0, 5) * 1000;
        const jobName = `Http${i}`;
        const job: HttpRequestJobInfo = {
            id: crypto.randomUUID(),
            name: jobName,
            startTimestamp: newStartTimestamp,
            backgroundJobType: "HTTP",
            isFinished: Math.random() < 0.5,
        };

        const extraJobs = random(0, 2);
        for (let j = 0; j < extraJobs; j++) {
            jobs.push({
                ...job,
                id: crypto.randomUUID(),
                name: `${jobName}_extra${j}`,
            });
        }


        const extraJobs2 = random(0, 2);
        for (let j = 0; j < extraJobs2; j++) {
            jobs.push({
                ...job,
                id: crypto.randomUUID(),
                name: `${jobName}_extra${i}`,
            });
        }

        jobs.push(job);
    }

    return jobs;
}
