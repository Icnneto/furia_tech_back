class UserData {
    constructor({
        username,
        nascimento,
        email,
        cpf,
        pais,
        estado,
        interesses = [],
        eventos = [],
        perfil_x,
        documento
    }) {
        this.username = username;
        this.nascimento = nascimento;
        this.email = email;
        this.cpf = cpf;
        this.pais = pais;
        this.estado = estado;
        this.interesses = Array.isArray(interesses) ? interesses : [];
        this.eventos = Array.isArray(eventos) ? eventos : [];
        this.perfil_x = perfil_x;
        this.documento = documento;
    }
};

export default UserData;