import { Component, inject, OnInit } from '@angular/core';
import { PostsService } from '../../core/services/posts.service';
import { Iposts } from '../../core/interfaces/iposts';
import { DatePipe } from '@angular/common';
import { CommentComponent } from "../../shared/ui/comment/comment.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [DatePipe, CommentComponent,FormsModule],
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.scss'
})
export class TimelineComponent  implements OnInit{
  private readonly _PostsService = inject(PostsService);
  saveFile!: File;
  postList:Iposts[] = [];
  content:string = "";
  ngOnInit(): void {
    this._PostsService.getAllPosts().subscribe({
      next:(res)=>{
        console.log(res)
        this.postList = res.posts;
        console.log(res.posts)
      }
    })
  }
  changeImage(e:Event){
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.saveFile = input.files[0];
    }
  }

  submitPost():void{
    const data = new FormData();
    data.append('body' , this.content);
    data.append('image',this.saveFile);
    this._PostsService.createPost(data).subscribe({
      next:(res)=>{
        console.log(res);
      }
    })
    this._PostsService.getAllPosts().subscribe({
      next:(res)=>{
        console.log(res)
        this.postList = res.posts.reverse();
        console.log(res.posts)
      }
    })
  }



}
