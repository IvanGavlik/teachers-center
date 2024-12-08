export class Lecture {
      constructor(public language: string,
      public languageLevel: string,
      public vocabularyTopic: string,
      public vocabularySize: number,
      public vocabularyQuestions: number,
      public grammarTopic: string,
      public grammarExamples: number,
      public grammarExercises: number,
      public homework: boolean,
      public discussion: boolean,
      public dictionary: boolean,
     public commonPhrases: boolean) {
  }

  system(): string {
    return 'You are foreign language teacher and you have to prepare materials for you next class. You will be provided with points, and your task is to used them to create lecture. Lecture is for ' + this.language + ' language ' + this.languageLevel + ' level.';
  }

  lecture(): string {
    let topicTemp = ' Generate text on topic ' + this.vocabularyTopic + '. Size of the text around ' + this.vocabularySize + ' words for language level ' + this.languageLevel + ' and also create questions on this topic (generated text) number of questions ' + this.vocabularyQuestions + ' Text should manly have grammatical constructs of ' + this.grammarTopic;
    let dictionaryTemp = this.dictionary ?  ' From the text that you created make dictionary of nouns, verbs and other... Put all relevant info for nouns put article, plural for verbs conjugation and so on ' : '';
    let commonPhrasesTemp = this.commonPhrases ? ' Generate at least 5 common phrases on topic ' + this.vocabularyTopic + ' for language level ' + this.languageLevel : '';
    let grammarTemp = ' Explain grammar for level ' + this.languageLevel + ' student ' + ' also generate examples ' + this.grammarExamples + ' using text from topic ' + this.vocabularyTopic + '. This is not all student needs to have exercises on grammar. Create ' + this.grammarExercises + ' tasks (also focus on topic)';
    let discussionTemp = this.discussion ? ' During the class I want to have discussion on ' + this.vocabularyTopic + ' so create questions and ideas on this, so that we can have conversation on ' + this.language + ' on level ' + this.languageLevel : '';
    let homeworkTemp = this.homework ? ' Create homework for student focus on topic '+ this.vocabularyTopic + ' also have grammar ' + this.grammarTopic + 'tasks' : '';
    return topicTemp + + dictionaryTemp + commonPhrasesTemp + grammarTemp + discussionTemp + homeworkTemp;
  }





  }
