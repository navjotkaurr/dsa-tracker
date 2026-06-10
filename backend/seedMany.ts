import  dotenv  from "dotenv";
import { ProblemModel } from "./models/problemModel.js";
import { TopicModel } from "./models/TopicModel.js"
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const seedManyProblems = async () => {
    try {
        const topic = await TopicModel.findOne({});

    if(!topic) {
        console.log('Please create a topic first');
        process.exit(1);
    }

    console.log(`adding 1000 problems`)

    const problems = [];
    for(let i = 0; i < 1000; i++) {
        problems.push({
            title: `Problem ${i + 1}`,
            level: i % 3 === 0 ? 'Easy':
            i % 3 === 1 ? 'Medium' : 'Hard',
              leetCodeLink: `https://leetcode.com/problems/problem-${i}`,
                youtubeLink:  '',
                articleLink:  '',
        })
    }

    const inserted = await ProblemModel.insertMany(problems);
    console.log(`${inserted.length} problems created`);

    inserted.forEach(p => topic.problems.push(p._id as any));

    await topic.save();
    console.log(`all problems linked to topic`);
    console.log(`now test getTopics in Postman!`);

    process.exit();
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

seedManyProblems();