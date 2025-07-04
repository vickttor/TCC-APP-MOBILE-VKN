import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Dimensions, Modal} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  updateForm,
  updateAgendamento,
} from '../../../../store/modules/salao/actions';
import {Text, Box, Touchable, Cover} from '../../../../styles';
import theme from '../../../../styles/theme.json';
import moment from 'moment';
moment.locale('pt-br');

const EspecialistasModal = ({
  form,
  colaboradores,
  agendamento,
  servicos,
  colaboradoresDia,
  horaSelecionada,
}) => {
  const dispatch = useDispatch();
  let colaboradoresIdsDisponiveis = [];

  for (let colaboradorId of Object.keys(colaboradoresDia)) {
    let horarios = colaboradoresDia[colaboradorId].flat(2);
    if (horarios.includes(horaSelecionada)) {
      colaboradoresIdsDisponiveis.push(colaboradorId);
    }
  }

  const colaboradoresDisponiveis = colaboradores.filter((c) =>
    colaboradoresIdsDisponiveis.includes(c._id),
  );
  const servico = servicos.filter((c) => c._id === agendamento.servicoId)[0];

  return (
    <Modal
      visible={form.modalEspecialista}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(updateForm('modalEspecialista', false))}>
      <Box
        background="rgba(0,0,0,0.5)"
        style={{ flex: 1 }}
        justify="center"
        align="center"
        hasPadding>
        <Box
          background="light"
          style={{ borderRadius: 7, maxHeight: '80%', width: '90%' }}>
          <ScrollView>
            <Box hasPadding direction="column">
              <Text bold color="dark">
                {servico?.titulo + ' '}
              </Text>
              <Text small composed>
                disponíveis em{' '}
                <Text small underline composed>
                  {moment(agendamento.data).format('DD/MM/YYYY (ddd) [às] HH:mm')}
                </Text>
              </Text>
              <Box wrap="wrap" height="auto" spacing="10px 0 0">
                {colaboradoresDisponiveis.map((colaborador) => (
                  <Touchable
                    key={colaborador._id}
                    width={(Dimensions.get('screen').width - 80) / 4}
                    height="70px"
                    spacing="10px 0px 0px 0px"
                    direction="column"
                    align="center"
                    onPress={() => {
                      dispatch(updateAgendamento('colaboradorId', colaborador._id));
                      dispatch(updateForm('modalEspecialista', false));
                    }}>
                    <Cover
                      height="45px"
                      width="45px"
                      circle
                      border={
                        colaborador._id === agendamento.colaboradorId
                          ? `2px solid ${theme.colors.primary}`
                          : 'none'
                      }
                      spacing="0px 0px 5px 0px"
                      image={colaborador.foto}
                    />
                    <Text
                      small
                      bold={colaborador._id === agendamento.colaboradorId}>
                      {colaborador.nome}
                    </Text>
                  </Touchable>
                ))}
              </Box>
            </Box>
          </ScrollView>
        </Box>
      </Box>
    </Modal>
  );
};

export default EspecialistasModal;
