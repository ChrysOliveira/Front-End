'use strict';

System.register(['./HttpService', './ConnectionFactory', '../models/Negociacao', '../dao/NegociacaoDao'], function (_export, _context) {
    "use strict";

    var HttpService, ConnectionFactory, Negociacao, NegociacaoDao, _createClass, NegociacaoService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }, function (_daoNegociacaoDao) {
            NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export('NegociacaoService', NegociacaoService = function () {
                function NegociacaoService() {
                    _classCallCheck(this, NegociacaoService);

                    this._http = new HttpService();
                }

                _createClass(NegociacaoService, [{
                    key: 'importaNegociacoesDasSemanas',
                    value: function importaNegociacoesDasSemanas(listaAtual) {

                        return Promise.all([this.obtemNegociacoesSemana(), this.obtemNegociacoesSemanaAnterior(), this.obtemNegociacoesSemanaRetrasada()]).then(function (listaDeNegociacoesDoPromise) {
                            return listaDeNegociacoesDoPromise.reduce(function (achatado, atual) {
                                return achatado.concat(atual);
                            }, []).filter(function (negociacao) {
                                return !listaAtual.some(function (negociacaoExistente) {
                                    return negociacao.equals(negociacaoExistente);
                                });
                            });
                        }).catch(function (error) {

                            console.log(error);
                            throw new Error('Nao foi possivel importar as negociacoes');
                        });
                    }
                }, {
                    key: 'obtemNegociacoesSemana',
                    value: function obtemNegociacoesSemana() {
                        var _this = this;

                        return new Promise(function (resolve, reject) {

                            _this._http.get('negociacoes/semana').then(function (negociacoes) {
                                resolve(negociacoes.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (erro) {
                                console.log(erro);
                                reject('Nao foi possivel obter as negociacoes da semana');
                            });
                        });
                    }
                }, {
                    key: 'obtemNegociacoesSemanaAnterior',
                    value: function obtemNegociacoesSemanaAnterior() {
                        var _this2 = this;

                        return new Promise(function (resolve, reject) {

                            _this2._http.get('negociacoes/anterior').then(function (negociacoes) {
                                resolve(negociacoes.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (erro) {
                                console.log(erro);
                                reject('Nao foi possivel obter as negociacoes da semana anterior');
                            });
                        });
                    }
                }, {
                    key: 'obtemNegociacoesSemanaRetrasada',
                    value: function obtemNegociacoesSemanaRetrasada() {
                        var _this3 = this;

                        return new Promise(function (resolve, reject) {

                            _this3._http.get('negociacoes/retrasada').then(function (negociacoes) {
                                resolve(negociacoes.map(function (objeto) {
                                    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                                }));
                            }).catch(function (erro) {
                                console.log(erro);
                                reject('Nao foi possivel obter as negociacoes da semana retrasada');
                            });
                        });
                    }
                }, {
                    key: 'cadastra',
                    value: function cadastra(negociacao) {

                        return ConnectionFactory.getConnection().then(function (conexao) {
                            return new NegociacaoDao(conexao);
                        }).then(function (dao) {
                            return dao.adiciona(negociacao);
                        }).then(function () {
                            return 'Negociacao adicionada com sucesso';
                        }).catch(function () {

                            throw new Error('Nao foi possivel adicionar a negociacao');
                        });
                    }
                }, {
                    key: 'lista',
                    value: function lista() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.listaTodos();
                        }).catch(function (erro) {

                            console.log(erro);
                            throw new Error('Nao foi possivel obter as negociacoes');
                        });
                    }
                }, {
                    key: 'limpa',
                    value: function limpa() {

                        return ConnectionFactory.getConnection().then(function (conexao) {
                            return new NegociacaoDao(conexao);
                        }).then(function (dao) {
                            return dao.limpaNegociacoes();
                        }).then(function () {
                            return 'Negociacoes apagadas com sucesso';
                        }).catch(function (erro) {

                            console.log(erro);
                            throw new Error('Nao foi possivel limpar as negociacoes');
                        });
                    }
                }]);

                return NegociacaoService;
            }());

            _export('NegociacaoService', NegociacaoService);
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map