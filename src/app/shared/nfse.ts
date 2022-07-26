export interface Nfse {
  indexOf(cliente: any): any;
  slice(arg0: any, arg1: number);
  status: string;
  numero: string;
  declaracao_prestacao_servico: DeclaracaoServico;
}

export interface DeclaracaoServico {
  competencia: string;
  natureza_tributacao: string;
  fone: string;

  rps: Rps;

  tomador: Tomador;

  prestador: Prestador;
}
export interface Rps {
  identificacao_rps: {
    numero: number;
    serie: string;
  };
  data_emissao: string;
}

export interface Tomador {
  cpf_cnpj: string;
  inscricao_municipal: string;
  nome_razao_social: string;
  fone: string;
  email: string;
}

export interface Prestador {
  cpf_cnpj: string;
  email: string;
  nome_fantasia: string;
  nome_razao_social: string;
}

// export interface Nfse {
//         id: string,
//         created_at: string,
//         status: string,
//         numero: string,
//         codigo_verificacao: string,
//         link_url: string,
//         data_emissao: string,
//         ambiente: string,
//         referencia: string,
//         declaracao_prestacao_servico_rps_identificacao_rps: string,
//         rps_identificacao_numero: string,
//         rps_identificacao_serie: string
//         rps_data_emissao: string,
//         declaracao_prestacao_servico_competencia: string,
//         declaracao_prestacao_servico_natureza_tributacao: string,

//               prestador_cpf_cnpj: string,
//               prestador_inscricao_municipal: string,
//               prestador_nome_razao_social: string,
//               prestador_nome_fantasia: string,
//               prestador_email: string,
//               prestador_endereco_logradouro: string,
//               prestador_endereco_numero: string,
//               prestador_endereco_bairro: string,
//               prestador_endereco_codigo_municipio: string,
//               prestador_endereco_cidade: string,
//               prestador_endereco_uf: string,
//               prestador_endereco_codigo_pais: string,
//               prestador_endereco_pais: string,
//               prestador_endereco_cep: string,
//               prestador_optante_simples_nacional: string,
//               prestador_regime_tributacao: string,
//               prestador_regime_especial_tributacao: string,
//               prestador_incentivo_fiscal: string,
//               prestador_incentivador_cultural: string

//               tomador_cpf_cnpj: string,
//               tomador_inscricao_municipal: string,
//               tomador_nome_razao_social: string,
//               tomador_fone: string,
//               tomador_email: string,
//               tomador_endereco_logradouro: string,
//               tomador_endereco_numero: string,
//               tomador_endereco_complemento: string,
//               tomador_endereco_bairro: string,
//               tomador_endereco_codigo_municipio: string,
//               tomador_endereco_cidade: string,
//               tomador_endereco_uf: string,
//               tomador_endereco_codigo_pais: string,
//               tomador_endereco_pais: string,
//               tomador_endereco_cep: string,

//               servicos_iss_retido: string,
//               servicos_responsavel_retencao: string,
//               servicos_item_lista_servico: string,
//               servicos_codigo_cnae: string,
//               servicos_codigo_tributacao_municipio: string,
//               servicos_discriminacao: string,
//               servicos_codigo_municipio: string,
//               servicos_codigo_pais: string,
//               servicos_tipo_tributacao: string,
//               servicos_exigibilidade_iss: 1,
//               servicos_codigo_municipio_incidencia: string,
//               servicos_numero_processo: string,
//               servicos_unidade: string,
//               servicos_quantidade: string,

//               servicos_valores_valor_unitario: string,
//               servicos_valores_valor_servicos: string,
//               servicos_valores_valor_deducoes: string,
//               servicos_valores_valor_pis: string,
//               servicos_valores_valor_cofins: string,
//               servicos_valores_valor_inss: string,
//               servicos_valores_valor_ir: string,
//               servicos_valores_valor_csll: string,
//               servicos_valores_valor_outras_retencoes: string,
//               servicos_valores_valor_iss: string,
//               servicos_valores_valor_iss_retido: string,
//               servicos_valores_valor_liquido: string,
//               servicos_valores_aliquota_iss: string,
//               servicos_valores_aliquota_pis: string,
//               servicos_valores_aliquota_cofins: string,
//               servicos_valores_aliquota_inss: string,
//               servicos_valores_aliquota_ir: string,
//               servicos_valores_aliquota_csll: string,
//               servicos_valores_desconto_incondicionado: string,
//               servicos_valores_desconto_condicionado: string

//         mensagens: []
//     }
