import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ContactDto} from "../../Model/ContactDto";
import Swal from "sweetalert2";
import {TransactionsService} from "../../Services/transactions.service";
import {ContactService} from "../../Services/contact.service";
import {DemandeService} from "../../Services/demande.service";
import {DemandeDto} from "../../Model/DemandeDto";

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrl: './receive.component.css'
})
export class ReceiveComponent {
  username = localStorage.getItem('username') ?? '';
  alias = localStorage.getItem('alias') ?? '';

  constructor(private demandeService: DemandeService, private contactService: ContactService) {
  }


  onSubmit(aliasForm: NgForm) {
    if (aliasForm.valid) {
      const demandeDto = new DemandeDto(
        aliasForm.controls['montant'].value,
        this.alias,
        aliasForm.controls['alias'].value,
        aliasForm.controls['note'].value,
      )
      this.demandeService.createDemande(demandeDto).subscribe(
        response => {
          console.log('Demande created successfully', response);
          aliasForm.resetForm();
          Swal.fire({
            title: "Parfait!",
            text: "Demande Creé avec succès",
            icon: "success"
          });
        },
        error => {
          console.error('Error creating demande', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error || 'An error occurred while creating the contact'
          });
        }
      );

    }
  }
  onSubmitContact(contactForm: NgForm) {
    if (contactForm.valid) {

      const contactDto = new ContactDto(
        contactForm.controls['nomPrenom'].value,
        contactForm.controls['numeroCompte'].value,
        this.username
      )
      this.contactService.createContact(contactDto).subscribe(
        response => {
          console.log('Contact created successfully', response);
          contactForm.resetForm();
          Swal.fire({
            title: "Parfait!",
            text: "Conatact Creé avec succès",
            icon: "success"
          });
        },
        error => {
          console.error('Error creating contact', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error || 'An error occurred while creating the contact'
          });
        }
      );
    }
  }

}
