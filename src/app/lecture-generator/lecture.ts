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
    let topicTemp = `Generate for me a teaching unit in ` + this.language + `, the vocabulary topic of the lesson is ` + this.vocabularyTopic + `. It should be at ` + this.languageLevel + ` level.
     Generate the text in such a way that the includes grammar topic ` + this.grammarTopic + ` text should be around ` + this.vocabularySize + ` words.
     Next tasks on vocabulary.
     Make me n tasks and each of them should have 5 subtasks. if n is zero do not create tasks on vocabulary and ignore instruction about tasks. n in this case is ` + this.vocabularyQuestions + `
     Here are instruction for first 3 vocabulary tasks (other tasks generate on your own). Example: If n is 5 for first three task follow instructions rest generate own you own.
     Here are Instructions about vocabulary tasks consider this only if n is not zero.
        1. The task should be circled whether the statement is true or false, the statements are based on the text.
        After that, select potentially new words for the students and create examples in which you show the students how these words are used in the ` + this.language + `,
         i.e. based on your explanation, the students should conclude what that word means in native language, without you having said the word in native language.
        After that comes the 2nd task.
       The 2nd task should include simple word recognition.
       The 3rd task, the students themselves must determine which word corresponds,
        it should be more complex than the 2nd task and the 4th task should require the students to produce something on that topic.
     No tasks that contain an instruction to translate something from one language to another.`

    let grammarTemp = `Grammar part of a lesson is  ` + this.grammarTopic + `. In the vocabulary text this grammar should be used
    . make me a summary in which you state all the essential characteristics of
    ` + this.grammarTopic + `. It should be stated when it is used, how it is formed. Be sure to note the exceptions and create at lest ` + this.grammarExamples + ` user vocabulary topic ` + this.vocabularyTopic + ` to create examples
    After that, Create grammar tasks each task with 5 subtasks. if m is zero do not create tasks on grammar and ignore instruction about grammar tasks
    m is  ` + this.grammarExercises + `
    Here are instructions about grammar tasks
      First the task should be simple, so that that with next one  complexity should increase,
      At lest one of the task  should be such that it requires the student to produce something himself. Keep in mind that the tasks are
      diverse, so each task should be assigned to a different type. One task should include work in pairs or in groups.
      Decide that yourself and generate such a task.  The class is intended for students at ` + this.languageLevel + ` level.
      Tasks and explanations should be written in ` + this.language + `. `


   // let topicTemp = ' Generate text on topic ' + this.vocabularyTopic + '. Size of the text around ' + this.vocabularySize + ' words for language level ' + this.languageLevel + ' and also create questions on this topic (generated text) number of questions ' + this.vocabularyQuestions + ' Text should manly have grammatical constructs of ' + this.grammarTopic;
    let dictionaryTemp = this.dictionary ?  ' From the text that you created make dictionary of nouns, verbs and other... Put all relevant info for nouns put article, plural for verbs conjugation and so on ' : '';
    let commonPhrasesTemp = this.commonPhrases ? ' Generate at least 5 common phrases on topic ' + this.vocabularyTopic + ' for language level ' + this.languageLevel : '';
  //  let grammarTemp = ' Explain grammar for level ' + this.languageLevel + ' student ' + ' also generate examples ' + this.grammarExamples + ' using text from topic ' + this.vocabularyTopic + '. This is not all student needs to have exercises on grammar. Create ' + this.grammarExercises + ' tasks (also focus on topic)';
    let discussionTemp = this.discussion ? ' During the class I want to have discussion on ' + this.vocabularyTopic + ' so create questions and ideas on this, so that we can have conversation on ' + this.language + ' on level ' + this.languageLevel : '';
    let homeworkTemp = this.homework ? ' Create homework for student focus on topic '+ this.vocabularyTopic + ' also have grammar ' + this.grammarTopic + 'tasks' : '';
    return topicTemp + + dictionaryTemp + commonPhrasesTemp + grammarTemp + discussionTemp + homeworkTemp;
  }





  }
