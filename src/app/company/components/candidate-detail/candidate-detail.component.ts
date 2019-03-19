import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CandidateService} from '../../../core/services/candidate/candidate.service';
import {Candidate} from '../../../core/models/candidate';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
declare  var $: any;

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.css']
})

//TODO: Add handling error in service
//TODO: Make beter good looking for UI
export class CandidateDetailComponent implements OnInit {

  isLoading = true;
  candidate: Candidate;
  isLoadingBtnDownloadPDF = false;
  constructor(private activatedRoute: ActivatedRoute,
              private candidateService: CandidateService) { }

  ngOnInit() {
    let jobId =this.activatedRoute.snapshot.paramMap.get('jobId');
    let candidateId = this.activatedRoute.snapshot.paramMap.get('candidateId');

      this.candidateService.getCandidate(jobId, candidateId).subscribe((response: Candidate) => {
        this.isLoading = false;
        this.candidate = response;
      });
  }
  public captureScreen(btnDownload: HTMLButtonElement) {
    this.isLoadingBtnDownloadPDF = true;
    console.log(btnDownload);

    const data = $('#content')[0];
    html2canvas(data).then(canvas => {
        // Few necessary setting options
        const imgWidth = 208;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
        const position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        this.isLoadingBtnDownloadPDF = false;
        const candidateFileName = 'CV_' + this.candidate.lastName + '_' + this.candidate.firstName + '.pdf';
        pdf.save(candidateFileName); // Generated PDF
      });

  }

}
