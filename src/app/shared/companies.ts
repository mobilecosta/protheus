
export interface Nfse {

  ambiente: string,
  rps: {
    lote: 1,
    serie: string,
    numero: 1
  }
}
export interface Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  codigo_municipio: string;
  cidade: string;
  uf: string;
  codigo_pais: string;
  pais: string;
  cep: string;
}

export interface Empresa {
  cpf_cnpj: string;
  inscricao_estadual: string;
  inscricao_municipal: string;
  nome_razao_social: string;
  nome_fantasia: string;
  fone: string;
  email: string;
  status: string;

  endereco: Endereco;

  nfse: Nfse
}