import { Component, OnInit } from '@angular/core';
declare var $ : any;

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css']
})
export class SearchFiltersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let resetFilters = $('#reset-filter');

    resetFilters.on('click', function () {
      $(this).parents('form').reset();
    });

    $(document).ready(function() {
      $('select').material_select();
    });



  }

}
