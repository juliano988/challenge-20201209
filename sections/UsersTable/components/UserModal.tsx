import React, { useState } from "react";
import styles from '../../../styles/sections/UsersTable/UserModal-styles.module.scss';
import { Button, Col, Form, InputGroup, Modal, Row, Spinner } from "react-bootstrap";
import { TableItem } from "../../../customTypes";
import { CircleFlag } from 'react-circle-flags'
import { useEffect } from "react";


export default function UserModal(props: { modalUserData: TableItem, tableContent: Array<TableItem>, settableContent: React.Dispatch<React.SetStateAction<TableItem[]>>, showUserModal: boolean, setShowUserModal: React.Dispatch<React.SetStateAction<boolean>> }) {

  const [deleteBtnClickCount, setdeleteBtnClickCount] = useState<number>(0);
  const [updateBtnClickCount, setupdateBtnClickCount] = useState<number>(0);

  const [userGender, setuserGender] = useState<string>('');
  const [userTitle, setuserTitle] = useState<string>('');
  const [userFirstName, setuserFirstName] = useState<string>('');
  const [userLastName, setuserLastName] = useState<string>('');
  const [userStreetName, setuserStreetName] = useState<string>('');
  const [userStreetNumber, setuserStreetNumber] = useState<number>(0);
  const [userCity, setuserCity] = useState<string>('');
  const [userState, setuserState] = useState<string>('');
  const [userPostcode, setuserPostcode] = useState<number>(0);
  const [userEmail, setuserEmail] = useState<string>('');
  const [userDobDate, setuserDobDate] = useState<string>('');
  const [userPhone, setuserPhone] = useState<string>('');
  const [userCell, setuserCell] = useState<string>('');

  useEffect(function () {
    setuserGender(props.modalUserData?.userData.gender);
    setuserTitle(props.modalUserData?.userData.name.title);
    setuserFirstName(props.modalUserData?.userData.name.first);
    setuserLastName(props.modalUserData?.userData.name.last);
    setuserStreetName(props.modalUserData?.userData.location.street.name);
    setuserStreetNumber(props.modalUserData?.userData.location.street.number);
    setuserCity(props.modalUserData?.userData.location.city);
    setuserState(props.modalUserData?.userData.location.state);
    setuserPostcode(props.modalUserData?.userData.location.postcode);
    setuserEmail(props.modalUserData?.userData.email);
    setuserDobDate(new Date(props.modalUserData?.userData.dob.date || new Date().toString()).toISOString().slice(0, 10));
    setuserPhone(props.modalUserData?.userData.phone);
    setuserCell(props.modalUserData?.userData.cell);
  }, [props])

  function handleOnHide() {
    setdeleteBtnClickCount(0);
    props.setShowUserModal(false);
  }

  function handleUpdateBtn() {
    setupdateBtnClickCount(updateBtnClickCount + 1);
    if (updateBtnClickCount + 1 === 3) {
      setupdateBtnClickCount(0)
    }
  }

  async function handleDeleteBtn() {
    setdeleteBtnClickCount(deleteBtnClickCount + 1);
    if (deleteBtnClickCount + 1 === 2) {
      await fetch('/api/users/' + props.modalUserData.id, { method: "DELETE" });
      const tempArray = props.tableContent.filter(function (tableItem) { return tableItem.id !== props.modalUserData.id });
      props.settableContent(tempArray);
      handleOnHide();
    }
  }

  return (
    <Modal centered show={props.showUserModal} onHide={handleOnHide}>
      <Modal.Body>
        {updateBtnClickCount >= 1 ?
          <>
            <h5>Atualização do cadastro de usuário:</h5>
            <Form>
              <InputGroup className="mb-3">
                <InputGroup.Text>Gênero</InputGroup.Text>
                <Form.Control size="sm" as="select" value={userGender} onChange={(e) => setuserGender(e.target.value)} >
                  <option value="male" >Masculino</option>
                  <option value="female" >Feminino</option>
                </Form.Control>
                <InputGroup.Text>Aniversário</InputGroup.Text>
                <Form.Control size="sm" type="date" value={userDobDate} onChange={(e) => setuserDobDate(e.target.value)} />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Nome completo</InputGroup.Text>
                <Form.Control size="sm" as="select" value={userTitle} onChange={(e) => setuserTitle(e.target.value)}>
                  <option value="Miss">Srta.</option>
                  <option value="Mrs">Sra.</option>
                  <option value="Mr">Sr.</option>
                </Form.Control>
                <Form.Control size="sm" type="text" value={userFirstName} onChange={(e) => setuserFirstName(e.target.value)} />
                <Form.Control size="sm" type="text" value={userLastName} onChange={(e) => setuserLastName(e.target.value)} />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Logradouro</InputGroup.Text>
                <Form.Control size="sm" type="text" value={userStreetName} onChange={(e) => setuserStreetName(e.target.value)} />
                <InputGroup.Text>nº</InputGroup.Text>
                <Form.Control size="sm" type="number" value={userStreetNumber} onChange={(e) => setuserStreetNumber(Number(e.target.value))} />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Cidade</InputGroup.Text>
                <Form.Control size="sm" type="text" value={userCity} onChange={(e) => setuserCity(e.target.value)} />
                <InputGroup.Text>Estado</InputGroup.Text>
                <Form.Control size="sm" type="text" value={userState} onChange={(e) => setuserState(e.target.value)} />
                <InputGroup.Text>CEP</InputGroup.Text>
                <Form.Control size="sm" type="number" value={userPostcode} onChange={(e) => setuserPostcode(Number(e.target.value))} />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>E-mail</InputGroup.Text>
                <Form.Control size="sm" type="text" value={userEmail} onChange={(e) => setuserEmail(e.target.value)} />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>Telefone</InputGroup.Text>
                <InputGroup.Text>Fixo</InputGroup.Text>
                <Form.Control size="sm" type="text" value={userPhone} onChange={(e) => setuserPhone(e.target.value)} />
                <InputGroup.Text>Celular</InputGroup.Text>
                <Form.Control size="sm" type="text" value={userCell} onChange={(e) => setuserCell(e.target.value)} />
              </InputGroup>
            </Form>
          </> :
          <>
            <div className={styles.user_img}>
              {props.modalUserData?.image}
              <CircleFlag countryCode={props.modalUserData?.nationality.toLowerCase()} height="35" />
            </div>
            <h4>{props.modalUserData?.title + ' ' + props.modalUserData?.fullName}</h4>
            <h6>Informações do cliente:</h6>
            <div className={styles.user_info}>
              <p><strong>E-mail:</strong> {props.modalUserData?.email}</p>
              <p><strong>Endereço:</strong> {props.modalUserData?.address}</p>
              <p><strong>Data de nascimento:</strong> {props.modalUserData?.birthDate}</p>
              <p><strong>Gênero:</strong> {props.modalUserData?.gender}</p>
              <p><strong>ID:</strong> {props.modalUserData?.id}</p>
            </div>
          </>}
      </Modal.Body>
      <Modal.Footer>

        <Button onClick={handleUpdateBtn}
          variant="warning">
          {updateBtnClickCount === 0 ? 'Atualizar' : updateBtnClickCount === 1 ? 'Salvar' :
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
        </Button>

        <Button onClick={handleDeleteBtn}
          variant="danger"
          disabled={deleteBtnClickCount === 2 ? true : false}>
          {deleteBtnClickCount === 0 ? 'Excluir' : deleteBtnClickCount === 1 ? 'Tem certeza?' :
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
        </Button>

      </Modal.Footer>
    </Modal >
  )
}