import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

// import { AccountService } from '../_services';
import { TournamentService } from '../_services';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    tournaments = null;

    constructor(private tournamentService: TournamentService) {}

    ngOnInit() {
        this.tournamentService.getAll()
            .pipe(first())
            .subscribe(tournaments => this.tournaments = tournaments);
    }

    deleteTournament(id: string) {
        const user = this.tournaments.find(x => x.id === id);
        user.isDeleting = true;
        this.tournamentService.delete(id)
            .pipe(first())
            .subscribe(() => this.tournaments = this.tournaments.filter(x => x.id !== id));
    }
}