import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";

// COMPONENTS
import QuestionsAndAnswers from "../QuestionsAndAnswers";
import Search from "../Features/Search/Search";
import QuestionList from "../Features/Questions/QuestionList";
import Question from "../Features/Questions/Question";
import Answer from "../Features/Questions/Answer";
import AnswerPhoto from "../Features/Questions/AnswerPhoto";
import AnswerForm from "../Features/Questions/AnswerForm";
import ExpandAndAdd from "../Features/ExpandAndAdd/ExpandAndAdd";
import QuestionForm from "../Features/ExpandAndAdd/QuestionForm";

const currProductId = 37324;
const currProductName = "Jaylen Backpack";
const questionBody = "Quam aperiam est dignissimos velit.";
const questionId = 300483;

jest.mock("axios");

describe("ability to render all components and subcomponents", () => {
  ////////////////////////////////////////
  // Question And Answer Component
  ////////////////////////////////////////
  test("question and answers component renders", async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: [] }));

    render(
      <QuestionsAndAnswers
        currProductId={currProductId}
        currProductName={currProductName}
      />
    );
  });

  ////////////////////////////////////////
  // Search Bar
  ////////////////////////////////////////
  test("search bar component renders", async () => {
    render(<Search />);
  });

  ////////////////////////////////////////
  // Question Component
  ////////////////////////////////////////
  //  => Question List
  test("question list component renders", async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
    const setDisplaymore = jest.fn(); // Create a mock function
    jest.spyOn(React, "useState").mockReturnValue([false, setDisplaymore]);

    render(
      <QuestionList
        currProductId={currProductId}
        currProductName={currProductName}
        moreQuestions={false}
        query=""
        setDisplayMore={setDisplaymore}
      />
    );
  });

  // => => Question
  test("question component renders", () => {
    render(
      <Question
        question={{
          question_id: 300494,
          question_helpfulness: 28,
        }}
        currProductName={currProductName}
        query=""
      />
    );
  });

  // => => => Answer
  test("answer component renders", async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: [] }));

    render(
      <Answer
        answer={{
          answer_id: 2803976,
          body: "Velit porro similique suscipit ut consequatur culpa ab autem.",
          date: "2020-12-17T00:00:00.000Z",
          answerer_name: "Quinton.Hoppe",
          helpfulness: 11,
          photos: [],
        }}
        query=""
      />
    );
  });

  // => => => => AnswerPhoto
  test("answer photo component renders", () => {
    const { getByTestId } = render(
      <AnswerPhoto
        photo={{
          id: 2481511,
          url: "https://images.unsplash.com/photo-1560095633-6803ba0461cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80",
        }}
      />
    );

    fireEvent.click(getByTestId("answer-photo-test"));

    const image = getByTestId("answer-photo-test");
    expect(image.src).toContain(
      "https://images.unsplash.com/photo-1560095633-6803ba0461cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=2734&q=80"
    );
  });

  // => => => Answer Form
  test("check if answer form pops-up", async () => {
    const { getByTestId } = render(
      <AnswerForm
        currProductId={currProductId}
        questionBody={questionBody}
        questionId={questionId}
      />
    );
  });

  ////////////////////////////////////////
  // ExpandAndAdd Component
  ////////////////////////////////////////
  test("expand and add component renders", () => {
    render(
      <ExpandAndAdd
        currProductId={currProductId}
        currProductName={currProductName}
      />
    );
  });

  // => Question Form
  test("check if question form pops-up", async () => {
    const { getByTestId } = render(
      <QuestionForm
        currProductId={currProductId}
        currProductName={currProductName}
      />
    );

    // fireEvent.click(getByTestId("add-questions-btn"));

    // const nameWarning = screen.getByText(
    //   /For privacy reasons, do not use your full name or email address/i
    // );
    // expect(nameWarning).toBeInTheDocument();

    // const emailWarning = screen.getByText(
    //   /For authentication reasons, you will not be emailed/i
    // );
    // expect(emailWarning).toBeInTheDocument();
  });
});
