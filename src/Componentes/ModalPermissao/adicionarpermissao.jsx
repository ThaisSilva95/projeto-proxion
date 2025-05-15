import React, { useState } from "react";
import InputText from '../InputText/InputText'

const permissionsList = [
    "Cadastrar/editar empresas",
    "Cadastrar/editar defeitos",
    "Cadastrar/editar equipamentos",
    "Cadastrar/editar analistas",
    "Realizar vistorias",
    "Redefinir senha",
    "Editar permissões",
    "Cadastrar permissões",

];



export default function PermissionsModal({ isOpen, onClose, role = "Administrador" }) {
    const [selectedUser, setSelectedUser] = useState("Fulano 1");
    const [checkedPermissions, setCheckedPermissions] = useState(new Set(permissionsList));
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [showAddUserModal, setShowAddUserModal] = useState(false);
    const [usersList, setUsersList] = useState(["Fulano 1", "Ciclano", "Beltrano"]);
    const [inputValue, setInputValue] = useState("");


    const togglePermission = (perm) => {
        const updated = new Set(checkedPermissions);
        updated.has(perm) ? updated.delete(perm) : updated.add(perm);
        setCheckedPermissions(updated);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center text-teal-700">
            <div className="bg-white rounded-2xl p-6 w-full max-w-3xl border border-teal-700 relative">
                {/* Título */}
                <h2 className="text-2xl font-bold  text-center mb-3 mt-6">
                    Criar Permissão
                </h2>

                <InputText
                    inputHeight="40px"
                    inputWidth="100px"
                    InputPlaceholder="Digite o n° de serie"
                    textStyle="text-center text-xl font-medium text-teal-700"
                    inputMargin="18px 0 0 0"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} // Atualiza o estado
                />

                {/* Permissões */}
                <div className="mb-4 border-t border-teal-700 pt-4 mb-11">
                    <div className="font-2x1 font-bold mb-5 ">Permissões</div>
                    <div className="grid grid-cols-2 gap-4 font-semibold">


                        {permissionsList.map((perm) => (
                            <React.Fragment key={perm}>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={checkedPermissions.has(perm)}
                                        onChange={() => togglePermission(perm)}
                                        className="accent-teal-700 w-4 h-4"
                                    />

                                    <div className="">{perm}</div>

                                </div>


                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Usuários atribuídos */}

                <div className="mb-4 border-t border-teal-700 pt-4">
                    <div className="flex gap-2 mt-2 justify-end mb-3">
                        <button onClick={() => setShowAddUserModal(true)} className="bg-teal-700 text-white px-4 py-1 rounded hover:bg-teal-600">
                            Adicionar Usuário
                        </button>

                        <button onClick={() => setShowRemoveModal(true)} className="border border-teal-700 px-4 py-1 rounded hover:bg-teal-100">
                            Remover Usuário
                        </button>

                    </div>
                    <h3 className="font-bold  mb-4">Usuários Atribuídos</h3>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" checked readOnly className="accent-teal-700 w-4 h-4" />
                        <span className="font-semibold">{selectedUser}</span>
                    </div>

                </div>

                {/* Ações */}
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={onClose}
                        className=" border border-tela-700 px-4 py-2 rounded hover:bg-teal-100"
                    >
                        Cancelar
                    </button>
                    <button className="bg-teal-700 text-white px-4 py-1 rounded hover:bg-teal-600">
                        Finalizar
                    </button>
                </div>

                {/* Botão fechar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-6 text-2x1 font-bold"
                >
                    X
                </button>
            </div>

            {showRemoveModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-teal-700 relative">
                        <h2 className="text-xl font-bold text-center">Confirmar remoção</h2>
                        <p className="text-center mt-4">Tem certeza que deseja remover {selectedUser}?</p>
                        <div className="flex justify-end gap-4 mt-6">
                            <button onClick={() => setShowRemoveModal(false)} className="border px-4 py-2 rounded hover:bg-gray-200">Cancelar</button>
                            <button onClick={() => {
                                setUsersList(usersList.filter(user => user !== selectedUser));
                                setSelectedUser(null);
                                setShowRemoveModal(false);
                            }} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Remover</button>
                        </div>
                    </div>
                </div>
            )}

            {showAddUserModal && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md border border-teal-700 relative">
                        <h2 className="text-xl font-bold text-center">Adicionar Usuário</h2>
                        <div className="mt-4">
                            {usersList.map(user => (
                                <div key={user} className="flex items-center gap-2">
                                    <input type="radio" name="user" value={user} onChange={() => setSelectedUser(user)} />
                                    <span>{user}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button onClick={() => setShowAddUserModal(false)} className="border px-4 py-2 rounded hover:bg-gray-200">Cancelar</button>
                            <button onClick={() => setShowAddUserModal(false)} className="bg-teal-700 text-white px-4 py-2 rounded hover:bg-teal-600">Adicionar</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
