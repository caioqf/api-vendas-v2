import handlebars from 'handlebars';
import fs from 'fs';


interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export default class HandlebarsMailTemplate {
  public async parser({file, variables}: IParseMailTemplate): Promise<string> {
    
    const fileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(fileContent);
     
    return parseTemplate(variables);
  }
}
