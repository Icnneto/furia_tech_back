class AIProfileAnalysis {
  constructor({
    relevante_para_informativos,
    relevante_para_eventos,
    sinergia_com_furia,
    overview
  }) {

    this.relevante_para_informativos = Number(relevante_para_informativos),
    this.relevante_para_eventos = Number(relevante_para_eventos),
    this.sinergia_com_furia = Number(sinergia_com_furia),
    this.overview = String(overview)

  }
}

export default AIProfileAnalysis;