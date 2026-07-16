import { AgentLoop } from "../agent/ AgentLoop.js";

const goal =
    process.argv
        .slice(2)
        .join(" ");

if (!goal) {

    console.error(
        "❌ Please provide a goal."
    );

    process.exit(1);

}

const agent =
    new AgentLoop();

try {

    const result =
        await agent.run(
            goal
        );

    console.log(
        "\n================================="
    );

    console.log(
        "🏁 TEST RESULT"
    );

    console.log(
        "================================="
    );

    console.log(
        JSON.stringify(
            result,
            null,
            2
        )
    );

}

catch (error) {

    console.error(
        "\n❌ TEST FAILED"
    );

    if (
        error instanceof Error
    ) {

        console.error(
            error.message
        );

    }

    else {

        console.error(
            error
        );

    }

    process.exit(1);

}