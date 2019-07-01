import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Picker,
  StyleSheet,
  StatusBar,
  ProgressBarAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import api from '../../services/api';

export default class myApp extends Component {
  constructor() {
    super();
    this.state = this.initialState();
  }

  initialState = () => ({
    pickerSuperiores: '',
    pickerSubordinados: '',
    pickerGestores: '',
    ePickerSuperiores: false,
    ePickerSubordinados: false,
    ePickerGestores: false,
    ePickerDate: true,
    orgaosSuperiores: [],
    orgaosSubordinados: [],
    orgaosGestores: [],
    dateInicial: '01/01/2019',
    dateFinal: '01/01/2019',
    dInicConvertida: '',
    dFimConvertida: '',
    dadosConsulta: '',
    progressBarAndroid: false,
  })

  resetState = async () => {
    this.habilitarrogressBar(true);
    await this.setState(this.initialState);
    this.habilitarrogressBar(false);
  }

  habilitarrogressBar = async (value) => {
    this.setState({ progressBarAndroid: value });
  }

  componentDidMount = async () => {
    this.habilitarrogressBar(true);
    await this.listarOrgaosSuperiores();
    await this.retornaDataAtual();
    await this.converterDatasSelecionadas();
    this.habilitarrogressBar(false);
  }

  listarOrgaosSuperiores = async () => {
    this.habilitarrogressBar(true);
    const superioresRepos = await api.get('/list-orgaos-superiores');
    await this.setState({ orgaosSuperiores: superioresRepos.data, ePickerSuperiores: true, ePickerDate: true });
    this.habilitarrogressBar(false);
  }

  listarOrgaosSubordinados = async (orgSuper) => {
    this.habilitarrogressBar(true);
    const subordinadosRepos = await api.post('/list-orgaos-subordinados', { id: orgSuper });
    await this.setState({ orgaosSubordinados: subordinadosRepos.data, ePickerSubordinados: true, ePickerDate: true });
    this.habilitarrogressBar(false);
  }

  listarOrgaosGestores = async (orgGestor) => {
    this.habilitarrogressBar(true);
    if (orgGestor !== undefined) {
      const gestoresRepos = await api.post('/list-orgaos-gestores', { id: orgGestor });
      await this.setState({ orgaosGestores: gestoresRepos.data, ePickerGestores: true, ePickerDate: true });
    } else {
      await this.setState({ orgaosGestores: [] });
    }
    this.habilitarrogressBar(false);
  }

  retornaDataAtual = async () => {
    const data = new Date();
    const dia = data.getDate().toString();
    const diaF = (dia.length == 1) ? `0${dia}` : dia;
    const mes = (data.getMonth() + 1).toString();
    const mesF = (mes.length == 1) ? `0${mes}` : mes;
    const anoF = data.getFullYear();
    const hjFormated = `${diaF}/${mesF}/${anoF}`;
    this.setState({ dateFinal: hjFormated });
  }

  converterDatasSelecionadas = async () => {
    const dataInicial = this.state.dateInicial;
    const diaInicial = dataInicial.slice(0, 2);
    const mesInicial = dataInicial.slice(3, 5);
    const anoInicial = dataInicial.slice(6, 10);
    const inicialConvertida = parseInt(anoInicial + mesInicial + diaInicial);
    const dataFinal = this.state.dateFinal;
    const diaFinal = dataFinal.slice(0, 2);
    const mesFinal = dataFinal.slice(3, 5);
    const anoFinal = dataFinal.slice(6, 10);
    const finalConvertida = parseInt(anoFinal + mesFinal + diaFinal);
    await this.setState({ dInicConvertida: inicialConvertida, dFimConvertida: finalConvertida });
  }

  buscarDados = async () => {
    this.habilitarrogressBar(true);
    await this.converterDatasSelecionadas();
    const consultaRepos = await api.post('/search', {
      orgaoSuperior: this.state.pickerSuperiores,
      orgaoSubordinado: this.state.pickerSubordinados,
      unidadeGestora: this.state.pickerGestores,
      dtInicial: this.state.dInicConvertida,
      dtFinal: this.state.dFimConvertida,
    });
    await this.setState({ dadosConsulta: consultaRepos.data });
    alert(this.state.dadosConsulta.custo_total_periodo);
    await this.resetState();
    await this.componentDidMount();
    this.habilitarrogressBar(false);
  };

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#2369b3',
      }}
      >

        {/* Barra de Status */}
        <StatusBar  backgroundColor="#2369b3" barStyle="light-content" />

        {/* Progress Bar */}
        <ProgressBarAndroid
          styleAttr="Horizontal"
          color="#ffffff"
          animating={this.state.progressBarAndroid}
        />
        {/* View do Header da página */}
        <View style={{
          backgroundColor: '#2369b3',
          paddingBottom: 0.1,
          padding: 15,
          paddingTop: 25,
          flex: 0.3,
        }}
        >
          {/* Título da página */}
          <Text style={{
            color: 'white',
            fontSize: 40,
            fontFamily: 'inherit',
            fontWeight: 'bold',
          }}
          >
                Portal da

          </Text>

          <Text style={{
            color: 'white',
            fontSize: 40,
            fontFamily: 'inherit',
            fontWeight: 'bold',
          }}
          >
                Transparência

          </Text>
          {/* Subtitulo da página */}
          <Text style={{
            fontSize: 20,
            color: '#ffff',
          }}
          >
                Controladoria-Geral da União
          </Text>
        </View>
        { /* Faixa azul escuro abaixo do header */ }
        <View style={{ backgroundColor: '#0E4097', flex: 0.05 }} />

        {/* Caixa de pesquisa */}
        <View style={{ backgroundColor: '#DCDCDC', flex: 1 }}>
          <Text style={{ fontSize: 18, marginTop: 10, marginLeft: 12 }}>Selecione as opções:</Text>
          <View style={{
            backgroundColor: '#ffff', flex: 0.9, margin: 10, borderRadius: 20, marginTop: 12, marginBottom: 10, paddingVertical: 20, paddingHorizontal: 15, alignItems: 'center',
          }}
          >
            <View style={{ alignItems: 'flex-start', width: '100%' }}>
              <Text style={{
                fontSize: 20, marginTop: 10, color: '#000000', marginBottom: 10,
              }}
              >
              Escolha o Orgão:
              </Text>
            </View>
            {/* Picker de orgão superiores */}
            <Picker
              style={{ width: '100%' }}
              enabled={this.state.ePickerSuperiores}
              selectedValue={this.state.pickerSuperiores}
              onValueChange={(itemValue) => {
                if (itemValue !== '') {
                  this.setState({ pickerSuperiores: itemValue });
                  this.listarOrgaosSubordinados(itemValue);
                  this.listarOrgaosGestores();
                } else {
                  this.setState({
                    pickerSuperiores: itemValue,
                    pickerSubordinados: itemValue,
                    pickerGestores: itemValue,
                    ePickerDate: true,
                  });
                }
              }}
            >
              {/* Itens dos Picker de orgão superiores */}
              <Picker.Item label="Orgãos Superiores" value="" />
              {this.state.orgaosSuperiores.map(reposSuperiores => (
                <Picker.Item
                  key={reposSuperiores._id}
                  label={reposSuperiores.nome_do_orgao_superior}
                  value={reposSuperiores.codigo_do_orgao_superior}
                />
              ))}

            </Picker>
            {/* Picker de orgão subordinados */}
            <Picker
              style={{ width: '100%' }}
              enabled={this.state.ePickerSubordinados}
              selectedValue={this.state.pickerSubordinados}
              onValueChange={(itemValue) => {
                if (itemValue !== '') {
                  this.setState({ pickerSubordinados: itemValue });
                  this.listarOrgaosGestores(itemValue);
                } else {
                  this.setState({
                    pickerSubordinados: itemValue,
                    pickerGestores: itemValue,
                    ePickerDate: true,
                  });
                }
              }}
            >
              {/* Itens do Picker de orgão subordinados */}
              <Picker.Item label="Orgãos Subordinados" value="" />
              {this.state.orgaosSubordinados.map(reposSubordinados => (
                <Picker.Item
                  key={reposSubordinados._id}
                  label={reposSubordinados.nome_do_orgao_subordinado}
                  value={reposSubordinados.codigo_do_orgao_subordinado}
                />
              ))}

            </Picker>
            {/* Picker de orgão gestores */}
            <Picker
              style={{ width: '100%' }}
              enabled={this.state.ePickerGestores}
              selectedValue={this.state.pickerGestores}
              onValueChange={(itemValue) => {
                if (itemValue === '') {
                  this.setState({ pickerGestores: itemValue });
                } else {
                  this.setState({ pickerGestores: itemValue, ePickerDate: false });
                }
              }}
            >
              {/* Itens do Picker de orgão gestores */}
              <Picker.Item label="Orgãos Gestores" value="" />
              {this.state.orgaosGestores.map(reposGestores => (
                <Picker.Item
                  key={reposGestores._id}
                  label={reposGestores.nome_do_orgao_gestor}
                  value={reposGestores.codigo_do_orgao_gestor}
                />
              ))}
            </Picker>
            {/* Texto informando ao usuário para escolher o período da consulta */}
            <View style={{ alignItems: 'flex-start', width: '100%' }}>
              <Text style={{ fontSize: 20, marginTop: 20, color: '#000000' }}>Escolha o período:</Text>
            </View>
            {/* View dos campos de datas */}
            <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 30 }}>
              {/* View do campo data inicial */}
              <View style={{ width: '50%', paddingHorizontal: 5 }}>

                <Text style={{ fontSize: 18, marginBottom: 10 }}>Data Inicial:</Text>
                {/* Definições do campo da inicial */}
                <DatePicker
                  style={{ width: '100%' }}
                  date={this.state.dateInicial}
                  mode="date"
                  disabled={this.state.ePickerDate}
                  placeholder="select date"
                  format="DD/MM/YYYY"
                  minDate="01-01-2019"
                  maxDate={this.state.dateFinal}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 36,
                    },
                  }}
                  onDateChange={(date) => { this.setState({ dateInicial: date }); }}
                />
              </View>
              {/* View do campo data final */}
              <View style={{ width: '50%', paddingHorizontal: 5 }}>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>Data Final:</Text>
                {/* Definições do campo da final */}
                <DatePicker
                  style={{ width: '100%' }}
                  date={this.state.dateFinal}
                  disabled={this.state.ePickerDate}
                  mode="date"
                  placeholder="select date"
                  format="DD/MM/YYYY"
                  minDate="01-01-2019"
                  maxDate={this.state.dateFinal}
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                    },
                    dateInput: {
                      marginLeft: 36,
                    },
                  }}
                  onDateChange={(date) => { this.setState({ dateFinal: date }); }}
                />
              </View>
            </View>
            <TouchableOpacity
              disabled={this.state.ePickerDate}
              onPress={this.buscarDados}
            >
              <Text style={[(this.state.ePickerDate) ? styles.btnDesabilitado : styles.btnHabilitado]}>Consultar</Text>
            </TouchableOpacity>

          </View>
        </View>


        <View style={{
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'flex-end',
          backgroundColor: '#ffff',
        }}
        >

          <Icon name="facebook-square" size={30} />
          <Icon name="twitter" size={30} />
          <Icon name="instagram" size={30} />
          <Icons name="whatsapp" size={30} />
        </View>

        <View style={{ backgroundColor: '#0E4097', flex: 0.07 }}>
          <Text style={{ color: 'white', fontSize: 16 }}> Desenvolvido por Scrumteam</Text>
        </View>

      </View>
    );
  }
}
const styles = StyleSheet.create({
  btnDesabilitado: {
    color: '#c6c6c6',
    fontSize: 30,
  },
  btnHabilitado: {
    color: '#2369b3',
    fontSize: 30,
  },
});