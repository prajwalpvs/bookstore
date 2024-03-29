import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewcartComponent implements OnInit {
  products:any;
  userId:any;
  total:any=0;
  num;

  constructor(private us:UserService, private router:Router,private spinner: NgxSpinnerService,private toastr: ToastrService) { }

  ngOnInit(): void {
    
   
    this.userId=localStorage.getItem("userId")
    this.spinner.show();
    this.getproduct();
    
  }

  getproduct(){
    this.us.getproduct(this.userId).subscribe(
      res=>{

      
           console.log("hello worldd")
        this.products= res.message
        console.log(this.products)
        let cartnum:[]=this.products
        this.us.cartvalue=cartnum.length
        console.log(cartnum.length)
        this.num=cartnum.length
        this.spinner.hide();
      },
      err=>{
        alert("Something went wrong in Adding product")
      })
  }

  ifOk(){

  }
 

  deleteproduct(i){
    this.products.splice(i, 1);
    this.us.deleteproduct(this.products[i].productname).subscribe(
      res=>{
        this.toastr.error('product removed"');
           
        if(res["message"]=="Product details deleted")
        {
          alert("product removed")
        }
      },
      err=>{
        alert("Something went wrong in Adding product")
        console.log(err)
      }
    )
  }


  goback(){
    this.router.navigateByUrl("/home")
  }

}
