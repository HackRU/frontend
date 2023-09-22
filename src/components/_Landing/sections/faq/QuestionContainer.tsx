import React from "react";
import { Disclosure } from "@headlessui/react";
import { GoChevronDown } from "react-icons/go";

/**
 * TODO: make it so that only one question can be open at a time.
 */



function Question(props: { question: string, answer: string }) {
    const { question, answer } = props;
    return (
        <Disclosure>
            {({ open }) => (
                <div className="flex flex-col border-b-white border-b-2 hover:bg-f23-mediumGreen rounded-t-lg">
                    <Disclosure.Button className="flex w-full justify-between
            p-4 text-left text-md text-textSubtitle
            focus:outline-none focus-visible:ring
            focus-visible:ring-opacity-75">
                        <span>{question}</span>
                        <GoChevronDown
                            className={`${open ? "rotate-180 transform" : ""} h-5 w-5 text-text`}
                        />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-white w-full">
                        {answer}
                    </Disclosure.Panel>
                </div>
            )}
        </Disclosure>
    );
}

const whatIsHackRUAnswer = `HackRU is a 24-hour hackathon at Rutgers University. We welcome hundreds of students to join us in building
awesome software and hardware projects. Industry experts and mentors come from all over the country to create
an environment that fosters an atmosphere of learning through teck talks and one-on-one guidance.
We encourage beginner and advanced hackers alike to challenge themselves and expand their skills.`;

const whatIsApplicationAnswer = `HackRU will be back in person this Fall 2023! We will be accepting anywhere between 300-500 hackers based on
when you register for the event. After you register, you'll get a notification 1-2 weeks before the hackathon whether we have accepted you or
not to the hackathon. You will then have to let us know if you plan on coming or not and then you're all set!`;

const winAnythingAnswer = "Yes! We'll release more information about prizes as the event draws near.";

const maskMandateAnswer = "No, HackRU will not have a mask mandate but it is encouraged throughout the duration of the event. ";

const moreQuestionsAnswer = "Reach out to us at info@hackru.org! We'll be happy to answer.";

const whoCanComeAnswer = `HackRU welcomes undergraduate and graduate students of all majors, backgrounds, and skill level to come create. Additionally, high
school students who will be 18 by HackRU are allowed to register. Unfortunately, if you are under 18, you will not be able to attend.`;

const newAnswer = `That's great! We'd love to have you at HackRU. Throughout the weekend, there will be workshops to get your feet wet,
project ideas for you to try out, and mentors to guide you through the process.`;

const costAnswer = "Like the best things in life, HackRU is completely free to attend!";

const workWithOthersAnswer = `Hackers can(and are encouraged to) work in teams of up to 4 humans max. The knowledge you gain from teammates is
invaluable, along with the opportunity to build lifetime friendships - you might leave with a new best friend! We will be having a team-building exercise
after opening ceremonies for people who are looking for teammates.`;

function QuestionContainer() {
    return (
        <div className="pt-16 ml-22 z-40">
            <div className="max-w-3xl rounded-2xl transparent-black-background p-10 sm:grid sm:grid-cols-2">
                <div>
                    <Question question="What is HackRU?"
                        answer={whatIsHackRUAnswer} />
                    <Question question="What is the application process like?"
                        answer={whatIsApplicationAnswer} />
                    <Question question="Can I win anything?"
                        answer={winAnythingAnswer} />
                    <Question question="Will there be a mask mandate?"
                        answer={maskMandateAnswer} />
                    <Question question="I have more questions!"
                        answer={moreQuestionsAnswer} />
                </div>
                <div>
                    <Question question="Who can come?"
                        answer={whoCanComeAnswer} />
                    <Question question="I'm new. What should I do? "
                        answer={newAnswer} />
                    <Question question="How much does it cost to attend?"
                        answer={costAnswer} />
                    <Question question="Can I work with others?"
                        answer={workWithOthersAnswer} />
                </div>
            </div>
        </div>
    );
}

export default QuestionContainer;