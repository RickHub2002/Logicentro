//import { defineStore } from 'pinia';
//
//export const useUserStore = defineStore('user', {
//  state: () => ({
//    username: '',
//  }),
//  actions: {
//    setUsername(name) {
//      this.username = name;
//    },
//  },
//});

//valida o ano dos veículos cadastrados
export function validarAno(ano) {
  const anoAtual = new Date().getFullYear();
  // Validar se o ano está dentro do intervalo permitido (1970-2024)
  if (ano >= 1970 && ano <= anoAtual) {
    return true
  } else {
    return false
  }
}

//valida o CPF dos motoristas
export function validarCPF(cpf){
  //remove qualquer caracter não númerico
  cpf=cpf.replace(/\D/g, '');

  //verifica se o CPF tem 11 dígitos e se são todos repetidos
  if(cpf.length!==11 || /^(\d)\1+$/.test(cpf)){
    return false;
  }else{
    //calcula os dígitos verificador
    function calcularDigito(cpf, peso){
      let soma=0;
      for (let i=0; i<peso-1; i++){
        soma+=parseInt(cpf[i])*(peso-i);
      }
      const resto=soma%11;
      return resto<2 ? 0 : 11-resto;
    }

    const digito1=calcularDigito(cpf, 10);
    const digito2=calcularDigito(cpf, 11);

    if(digito1 !== parseInt(cpf[9]) || digito2 !== parseInt(cpf[10])){
      return false;
    }else{
      return true;
    }
  }
}

//valida a CNH dos motoristas
export function validarCNH(cnh){
  //remove qualquer caracter não númerico
  cnh=cnh.replace(/\D/g, '');

  //verifica se a CNH tem 11 dígitos e se são todos repetidos
  if(cnh.length!==11 || /^(\d)\1+$/.test(cnh)){
    return false;
  }else{
    const cnhForn = cnh.substring(0, 9); // Primeiros 9 dígitos
    const digForn = cnh.substring(9, 11); // Últimos 2 dígitos

    let soma = 0;
    let mult = 9;
    let digito1;
    let incrDig2 = 0;

    // Cálculo do primeiro dígito verificador
    for (let j = 0; j < 9; j++) {
        soma += parseInt(cnhForn[j]) * mult;
        mult--;
    }

    digito1 = soma % 11;
    if (digito1 === 10) {
        incrDig2 = -2;
    }
    if (digito1 > 9) {
        digito1 = 0;
    }

    // Cálculo do segundo dígito verificador
    soma = 0;
    mult = 1;
    for (let j = 0; j < 9; j++) {
        soma += parseInt(cnhForn[j]) * mult;
        mult++;
    }

    let digito2;
    if ((soma % 11) + incrDig2 < 0) {
        digito2 = 11 + (soma % 11) + incrDig2;
    } else {
        digito2 = (soma % 11) + incrDig2;
    }

    if (digito2 > 9) {
        digito2 = 0;
    }

    const digEnc = digito1.toString() + digito2.toString();

    // Verifica se os dígitos verificadores estão corretos
    if (digForn === digEnc) {
        return true;
    } else {
        return false;
    }
  }
}

export function validarTel(telefone){
  //remove qualquer caracter não númerico
  telefone=telefone.replace(/\D/g, '');
  const ddd=parseInt(telefone.substring(0, 2));

  if(telefone.length===11 || telefone.length===10){
    if(11<=ddd && ddd<=99){
      if(parseInt(telefone[2])!==9 && telefone.length===11){
        return false;
      }else{
        return true;
      }
    }else{
      return false;
    }
  }else{
    return false;
  }
}

//valida o CNPJ dos motoristas
export function validarCNPJ(cnpj){
  //remove qualquer caracter não númerico
  cnpj=cnpj.replace(/\D/g, '');
  const pesos1=[5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const pesos2=[6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  //verifica se o CPF tem 14 dígitos e se são todos repetidos
  if(cnpj.length!==14 || /^(\d)\1+$/.test(cnpj)){
    return false;
  }else{
    //calcula os dígitos verificador
    function calcularDigito(cnpj, pesos){
      let soma=0;
      for (let i=0; i<pesos.length; i++){
        soma+=parseInt(cnpj[i])*(pesos[i]);
      }
      const resto=soma%11;
      return resto<2 ? 0 : 11-resto;
    }

    const digito1=calcularDigito(cnpj.slice(0, 12), pesos1);
    const digito2=calcularDigito(cnpj.slice(0, 12)+digito1.toString(), pesos2);

    if(digito1 !== parseInt(cnpj[12]) || digito2 !== parseInt(cnpj[13])){
      return false;
    }else{
      return true;
    }
  }
}


