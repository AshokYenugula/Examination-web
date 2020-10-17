import { Choices } from './Choices';

export interface Questions{
    QuestionId : number
    Question : string
    CorrectAnswer : number
    TestId : number
    choicesList : Choices[]
}