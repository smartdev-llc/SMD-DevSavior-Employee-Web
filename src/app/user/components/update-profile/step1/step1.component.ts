import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { AuthService } from '../../../../core/services/auth.service';
import { environment } from '../../../../../environments/environment';
import { StudentUserService }  from '../../../services/student-user.serivce';
import { AppErrors } from '../../../../core/error/app-errors';
import { ToastrService } from 'ngx-toastr';
import { BasicInfo, PersonalInfo } from '../../../../core/models/student-profile';
import { from } from 'rxjs';
import { find } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'update-profile-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss']
})
export class UpdateProfileStep1Component implements OnInit {
  ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  uploader: FileUploader;
  basicInfoFormGroup: FormGroup;
  personalInfoFormGroup: FormGroup;
  submittedBasic = false;
  isSubmittingBasic = false;
  submittedPersonal = false;
  isSubmittingPersonal = false;
  basicInfo: BasicInfo;
  personalInfo: PersonalInfo;
  profileImageURL: string = 'assets/images/profile-placeholder.png';

  academicLevel: Array<any>  = [];

  constructor(
    private formBuilder: FormBuilder,
    private studentUserService: StudentUserService,
    private toastr: ToastrService,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    let currentUser = this.authService.getCurrentUser();
    this.uploader = new FileUploader({
      url: environment.apiEndpoint + '/profile/me/avatar',
      method: 'PUT',
      disableMultipart: false,
      autoUpload: true,
      headers: [
        { name: "Authorization", value: "Bearer " + currentUser.access_token }
      ]
    });

    this.uploader.response.subscribe(res => {
      try {
        const data = JSON.parse(res);
        this.profileImageURL = data.profileImageURL ? environment.apiEndpoint + data.profileImageURL : this.profileImageURL;
      } catch(error) { }
    });

    // translate for ng select qualifications and classificationOfDegrees
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      const { academicLevel } = event.translations;
      this.translateAcademicLevelSelect(academicLevel);
    });
  }

  ngOnInit() {
    this.translate.get('academicLevel').subscribe((academicLevel: any) => {
      this.translateAcademicLevelSelect(academicLevel);
    });

    this.initForms();
    this.preLoadData();
  }

  preLoadData(): void {
    this.studentUserService.getMyProfile()
      .subscribe(response => {
        this.profileImageURL = response.owner.profileImageURL ? environment.apiEndpoint + response.owner.profileImageURL : this.profileImageURL;

        // basicInfo form
        this.basicInfo = new BasicInfo().deserialize(response);
        from(this.academicLevel)
          .pipe(
            find((item) => item.id === this.basicInfo.educationalStatus)
          ).subscribe(val => {
            this.basicInfo.educationalStatus = val || null;
          });
        this.basicInfoFormGroup.setValue(this.basicInfo);

        // personalInfo form
        this.personalInfo = new PersonalInfo().deserialize(response);
        this.personalInfoFormGroup.setValue(this.personalInfo);
      })
  }

  initForms(): void {
    this.basicInfoFormGroup = this.formBuilder.group({
      jobTitle: ['', Validators.required],
      educationalStatus: [null, Validators.required],
      yearsOfExperience: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
    });

    this.personalInfoFormGroup = this.formBuilder.group({
      fullName: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      currentAddress: ['', Validators.required],
    });
  }

  get biF() {
    return this.basicInfoFormGroup.controls;
  }

  get piF() {
    return this.personalInfoFormGroup.controls;
  }

  onSubmitBasicInfo() {
    this.submittedBasic = true;
    if (this.basicInfoFormGroup.invalid) {
      return;
    }
    this.isSubmittingBasic = true;
    const params = {
      ...this.basicInfoFormGroup.value,
      educationalStatus: this.basicInfoFormGroup.value.educationalStatus.id
    };
    this.studentUserService.updateBasicInfo(params)
    .subscribe((response) => {
      this.isSubmittingBasic = false;
      this.submittedBasic = false;
      this.showBasicSuccess();
    },
    (error: AppErrors) => {
      this.isSubmittingBasic = false;
      this.showBasicError(error);
    });
  }

  onSubmitPersonalInfo() {
    this.submittedPersonal = true;
    if (this.personalInfoFormGroup.invalid) {
      return;
    }

    this.isSubmittingPersonal = true;
    const params = {
      ...this.personalInfoFormGroup.value,
      dateOfBirth: moment(this.personalInfoFormGroup.value.dateOfBirth).format("DD-MM-YYYY")
    };
    this.studentUserService.updatePersonalInfo(params)
    .subscribe((response) => {
      this.isSubmittingPersonal = false;
      this.submittedPersonal = false;
      this.showBasicSuccess();
    },
    (error: AppErrors) => {
      this.isSubmittingPersonal = false;
      this.showBasicError(error);
    });
  }

  resetBasicForm() {
    this.basicInfoFormGroup.reset();
  }

  showBasicSuccess() {
    this.toastr.success('Your changes have been saved', 'Update Profile');
  }

  showBasicError(error: any) {
    this.toastr.error('Something went wrong please try again later', 'Update Profile');
  }

  public fileOver(e: any): void {
    console.log(e)
  }

  private translateAcademicLevelSelect(academicLevel: any): void {
    this.academicLevel = [
      { id: 'FIRST_TO_THIRD_YEAR', name: academicLevel.firstToThirdYear },
      { id: 'FOURTH_YEAR', name: academicLevel.fourthYear },
      { id: 'FINAL_YEAR', name: academicLevel.finalYear },
      { id: 'GRADUATED', name: academicLevel.graduated }
    ];
  }
}
