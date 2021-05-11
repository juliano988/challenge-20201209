import React from "react";
import styles from '../../../styles/sections/UsersTable/UserModal-styles.module.scss';
import { Button, Modal } from "react-bootstrap";
import { TableItem } from "../../../customTypes";
import ReactCountryFlag from "react-country-flag"
import { CircleFlag } from 'react-circle-flags'


export default function UserModal(props: { modalUserData: TableItem, showUserModal: boolean, setShowUserModal: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <Modal centered show={props.showUserModal} onHide={() => props.setShowUserModal(false)}>
      <Modal.Body>
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
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant="warning">Atualizar</Button>
        <Button onClick={props.onHide} variant="danger">Excluir</Button>
      </Modal.Footer>
    </Modal>
  )
}