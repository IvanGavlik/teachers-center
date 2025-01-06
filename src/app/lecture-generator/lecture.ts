export class Lecture {
  public language: string;
  public languageLevel: string;
  public vocabularyTopic: string;
  public vocabularySize: number;
  public vocabularyQuestions: number;
  public grammarTopic: string;
  public grammarExamples: number;
  public grammarExercises: number;
  public homework: boolean;
  public discussion: boolean;
  public dictionary: boolean;
  public commonPhrases: boolean;

  constructor(
    language: string,
    languageLevel: string,
    vocabularyTopic: string,
    vocabularySize: number,
    vocabularyQuestions: number,
    grammarTopic: string,
    grammarExamples: number,
    grammarExercises: number,
    homework: boolean,
    discussion: boolean,
    dictionary: boolean,
    commonPhrases: boolean
  ) {
    this.language = language;
    this.languageLevel = languageLevel;
    this.vocabularyTopic = vocabularyTopic;
    this.vocabularySize = vocabularySize;
    this.vocabularyQuestions = vocabularyQuestions;
    this.grammarTopic = grammarTopic;
    this.grammarExamples = grammarExamples;
    this.grammarExercises = grammarExercises;
    this.homework = homework;
    this.discussion = discussion;
    this.dictionary = dictionary;
    this.commonPhrases = commonPhrases;
  }

  url(): string {
    return (
      '/generate-lecture?language=' +
      this.language +
      '&language-level=' +
      this.languageLevel +
      '&topic=' +
      this.vocabularyTopic +
      '&topic-size=' +
      this.vocabularySize +
      '&topic-questions=' +
      this.vocabularyQuestions +
      '&grammar=' +
      this.grammarTopic +
      '&grammar-examples=' +
      this.grammarExamples +
      '&grammar-exercises=' +
      this.grammarExercises +
      '&homework=' +
      this.homework +
      '&discussion=' +
      this.discussion +
      '&dictionary=' +
      this.dictionary +
      '&common-phrases=' +
      this.commonPhrases
    );
  }
}
