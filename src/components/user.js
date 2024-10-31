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
    //calcula os dígitos verificador
    function calcularDigito(cnh, peso){
      let soma=0;
      for (let i=0; i<peso-1; i++){
        soma+=parseInt(cnh[i])*(peso-i);
      }
      const resto=soma%11;
      return resto;
    }

    const digito1=calcularDigito(cnh, 9);
    
    const digito2=calcularDigito(cnh, 11);

    if(digito1 !== parseInt(cnh[9]) || digito2 !== parseInt(cnh[10])){
      return false;
    }else{
      return true;
    }
  }
}
