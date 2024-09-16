import { DatePipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { CommentsService } from '../../../core/services/comments.service';
import { Icomment } from '../../../core/interfaces/icomment';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [DatePipe,ReactiveFormsModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent implements OnInit{
  @Input({required:true}) postId !: string;
  private readonly _CommentsService = inject(CommentsService);
  private readonly _FormBuilder = inject(FormBuilder)
  commentList:Icomment[] = [];
  comment!:FormGroup;
  ngOnInit(): void {
      this._CommentsService.getPostComment(this.postId).subscribe({
        next:(res)=>{
          console.log(this.postId,"    ",res.comments);
          this.commentList = res.comments
        }
      })


      this.comment = this._FormBuilder.group({
        content: [null],
        post: [this.postId]
      })
  }

  sendComment():void{
    this._CommentsService.creatComment(this.comment.value).subscribe({
      next:(res)=>{
        this.commentList = res.comments.reverse();
        this.comment.get('content')?.reset();
      }
    })
  }


}
