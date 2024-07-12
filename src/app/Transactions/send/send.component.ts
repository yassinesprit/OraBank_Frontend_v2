import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {TransfertDto} from "../../Model/TransfertDto";
import Swal from "sweetalert2";
import {TransactionsService} from "../../Services/transactions.service";
import {ContactDto} from "../../Model/ContactDto";
import {ContactService} from "../../Services/contact.service";

@Component({
  selector: 'app-send',
  templateUrl: './send.component.html',
  styleUrl: './send.component.css'
})
export class SendComponent implements OnInit {
  alias = localStorage.getItem('alias') ?? '';
  username = localStorage.getItem('username') ?? '';
  statusTransfert: string = 'Sortant';  // Set as needed


  constructor(private transactionsService: TransactionsService,private contactService: ContactService) {
  }


  onSubmitParAlias(form: NgForm) {
    if (form.valid) {
      console.log('Form submitted successfully:', form.value);
      // Here you can handle form submission logic, such as sending data to a service or API
      const transfertDto = new TransfertDto(
        'some-reference',
        form.controls['note'].value,
        form.controls['montant'].value,
        1,
        form.controls['alias'].value,
        this.alias,
        'ParAlias',
        this.statusTransfert,
        null,
        null,
        null,
        null
      );

      this.transactionsService.createTransfert(transfertDto).subscribe(response => {
        console.log('Transfert created successfully', response);
        form.resetForm();
        Swal.fire({
          title: "Parfait!",
          text: "Transfert effectué avec succès",
          icon: "success"
        });
      }, error => {
        console.error('Error creating transfert', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error || 'An error occurred while creating the transfer'
        });
      })
    }
  }

  onSubmitParIban(form: NgForm) {
    const transfertDto = new TransfertDto(
      'some-reference',
      form.controls['note'].value,
      form.controls['montant'].value,
      1,
      null,
      this.alias,
      'ParIBAN',
      this.statusTransfert,
      form.controls['nomBanque'].value,
      form.controls['paysBanque'].value,
      form.controls['iban'].value,
      null
    );

    this.transactionsService.createTransfert(transfertDto).subscribe(response => {
      console.log('Transfert created successfully', response);
      form.resetForm();
      Swal.fire({
        title: "Parfait!",
        text: "Transfert effectué avec succès",
        icon: "success"
      });
    }, error => {
      console.error('Error creating transfert', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.error || 'An error occurred while creating the transfer'
      });
    });
  }

  onSubmitParAutre(form: NgForm): void {
    const transfertDto = new TransfertDto(
      'some-reference',
      form.controls['note'].value,
      form.controls['montant'].value,
      1,
      null,
      this.alias,
      'ParAutreCompte',
      this.statusTransfert,
      null,
      form.controls['paysBanque'].value,
      null,
      form.controls['nomInstitut'].value
    );

    this.transactionsService.createTransfert(transfertDto).subscribe(response => {
      alert('Transfert created successfully'); // Simple alert for success
      console.log('Transfert created successfully', response);
      form.resetForm();
      Swal.fire({
        title: "Parfait!",
        text: "Transfert effectué avec succès",
        icon: "success"
      });
    }, error => {
      console.error('Error creating transfert', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.error || 'An error occurred while creating the transfer'
      });
    });
  }


  onSubmitContact(contactForm: NgForm){
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
  ngOnInit(): void {
  }
}
