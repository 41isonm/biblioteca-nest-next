
export class CreateEmprestimoDto {


  usuarioId: number;


  livroId: number;

 
  dataEmprestimo: string; 

 
  dataDevolucao?: string | null;
}