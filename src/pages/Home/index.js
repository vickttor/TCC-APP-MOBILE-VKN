import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { allServicos, getSalao } from '../../store/modules/salao/actions';

import Header from '../../components/Header';
import ModalAgendamento from '../../components/ModalAgendamento';
import Servico from '../../components/Servico';

const Home = () => {
  const dispatch = useDispatch();
  const {servicos, form} = useSelector((state) => state.salao);

  const finalServicos =
    form.inputFiltro.length > 0
      ? servicos.filter((s) => {
          const titulo = s.titulo.toLowerCase().trim();
          const arrSearch = form.inputFiltro.toLowerCase().trim().split(' ');
          return arrSearch.every((w) => titulo.search(w) !== -1);
        })
      : servicos;

  console.log('Total Serviços => ' + finalServicos.length);

  useEffect(() => {
    dispatch(getSalao());
    dispatch(allServicos());
  }, [dispatch]);

  return (
    <>
      <FlatList
        ListHeaderComponent={Header}
        data={finalServicos}
        renderItem={({item}) => <Servico key={item._id} item={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{paddingBottom: 100}}
      />
      <ModalAgendamento />
    </>
  );
};

export default Home;
