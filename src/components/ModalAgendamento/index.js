import React, {useEffect} from 'react';

import {Dimensions, ActivityIndicator, Modal} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import ModalResume from './resume';
import ModalHeader from './header';
import DateTimePicker from './Pickers/dateTime';
import EspecialistasPicker from './Pickers/Especialistas';
import EspecialistasModal from './Pickers/Especialistas/modal';
import PaymentPicker from './Pickers/payment';

import {useSelector, useDispatch} from 'react-redux';
import {updateForm, saveAgendamento} from '../../store/modules/salao/actions';

import {Button, Box, Title, Text, Spacer} from '../../styles';
import theme from '../../styles/theme.json';

import moment from 'moment';
import util from '../../util';

const ModalAgendamento = () => {
  const dispatch = useDispatch();

  const {form, servicos, agendamento, agenda, colaboradores} = useSelector(
    (state) => state.salao,
  );

  const servico = servicos.filter((s) => s._id === agendamento.servicoId)[0];
  const dataSelecionada = moment(agendamento.data).format('YYYY-MM-DD');
  const horaSelecionada = moment(agendamento.data).format('HH:mm');

  const {horariosDisponiveis, colaboradoresDia} = util.selectAgendamento(
    agenda,
    dataSelecionada,
    agendamento.colaboradorId,
  );

  const isVisible = form.modalAgendamento > 0 && !form.inputFiltroFoco;

  return (
    <>
      <Modal
        visible={isVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => {
          dispatch(
            updateForm(
              'modalAgendamento',
              0,
            ),
          );
        }}>
        <Box background="light" style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            stickyHeaderIndices={[0]}
            style={{
              backgroundColor: '#fff',
            }}>
            <ModalHeader
              form={form}
              onPress={() => {
                dispatch(
                  updateForm(
                    'modalAgendamento',
                    form.modalAgendamento === 1 ? 2 : 1,
                  ),
                );
              }}
            />
            <ModalResume servicos={servicos} agendamento={agendamento} />
            {agenda.length > 0 && (
              <>
                <DateTimePicker
                  servico={servico}
                  servicos={servicos}
                  agendamento={agendamento}
                  agenda={agenda}
                  dataSelecionada={dataSelecionada}
                  horaSelecionada={horaSelecionada}
                  horariosDisponiveis={horariosDisponiveis}
                />
                <EspecialistasPicker
                  colaboradores={colaboradores}
                  agendamento={agendamento}
                />
                <PaymentPicker />
                <Box hasPadding>
                  <Button
                    icon="check"
                    background="primary"
                    mode="contained"
                    block
                    disabled={form.agendamentoLoading}
                    loading={form.agendamentoLoading}
                    uppercase={false}
                    onPress={() => dispatch(saveAgendamento())}>
                    Confirmar meu agendamento
                  </Button>
                </Box>
              </>
            )}
            {agenda.length === 0 && (
              <Box
                background="light"
                direction="column"
                height={Dimensions.get('window').height - 200}
                hasPadding
                justify="center"
                align="center">
                <ActivityIndicator
                  size="large"
                  color={theme.colors.primary}
                />
                <Spacer />
                <Title align="center">Só um instante...</Title>
                <Text align="center" small>
                  Estamos buscando o melhor horário pra você...
                </Text>
              </Box>
            )}
          </ScrollView>
        </Box>
        <EspecialistasModal
          form={form}
          colaboradores={colaboradores}
          agendamento={agendamento}
          servicos={servicos}
          horaSelecionada={horaSelecionada}
          colaboradoresDia={colaboradoresDia}
        />
      </Modal>
    </>
  );
};

export default ModalAgendamento;
